export async function loadS3IntoPinecone(fileKey: string) {
    console.log("downloading s3 into file system");

    const file_name = await downloadFromS3(fileKey);

    if (!file_name) {
        throw new Error("could not download from s3");
    }

    const loader = new PDFLoader(file_name);
    const pages = (await loader.load()) as PDFPage[];

    const documents = await Promise.all(pages.map(prepareDocument));

    const vectors = (
        await Promise.all(documents.flat().map(embedDocument))
    ).filter((vector): vector is PineconeRecord => vector !== undefined);

    const pineconeIndex = pinecone.index("chatpdf");
    console.log("inserting vectors into pinecone");
    const namespace = convertToAscii(fileKey);

    const vectorChunks = chunks(vectors, 10);
    for (const chunk of vectorChunks) {
        await pineconeIndex.namespace(namespace).upsert(chunk);
    }

    return documents[0];
}