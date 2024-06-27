import mongoose, { Schema, Document, Model } from "mongoose";

var PDF: Model<
    IPDF,
    {},
    {},
    {},
    Document<unknown, {}, IPDF> & IPDF & Required<{ _id: unknown }>,
    any
>;

var FlashcardSet: Model<
    IFlashcardSet,
    {},
    {},
    {},
    Document<unknown, {}, IFlashcardSet> &
        IFlashcardSet &
        Required<{ _id: unknown }>,
    any
>;

var Flashcard: Model<
    IFlashcard,
    {},
    {},
    {},
    Document<unknown, {}, IFlashcard> & IFlashcard & Required<{ _id: unknown }>,
    any
>;

var QuizSet: Model<
    IQuizSet,
    {},
    {},
    {},
    Document<unknown, {}, IQuizSet> & IQuizSet & Required<{ _id: unknown }>,
    any
>;

var Quiz: Model<
    IQuiz,
    {},
    {},
    {},
    Document<unknown, {}, IQuiz> & IQuiz & Required<{ _id: unknown }>,
    any
>;

var Note: Model<
    INote,
    {},
    {},
    {},
    Document<unknown, {}, INote> & INote & Required<{ _id: unknown }>,
    any
>;

// PDF Model
export interface IPDF extends Document {
    userId: string;
    filename: string;
    content: Buffer;
    contentType: string;
    uploadDate: Date;
}

const PDFSchema = new Schema<IPDF>({
    userId: { type: String, required: true },
    filename: { type: String, required: true },
    content: { type: Buffer, required: true },
    contentType: { type: String, required: true },
    uploadDate: { type: Date, default: Date.now },
});

if (mongoose.models.PDF) {
    PDF = mongoose.model<IPDF>("PDF");
} else {
    PDF = mongoose.model<IPDF>("PDF", PDFSchema);
}

// Flashcard Model
interface IFlashcardSet extends Document {
    pdfId: Schema.Types.ObjectId;
    title: string;
    description: string;
    createdAt: Date;
}

const FlashcardSetSchema: Schema = new Schema({
    pdfId: { type: Schema.Types.ObjectId, ref: "PDF", required: true },
    title: { type: String, required: true },
    description: { type: String },
    createdAt: { type: Date, default: Date.now },
});

if (mongoose.models.FlashcardSet) {
    FlashcardSet = mongoose.model<IFlashcardSet>("FlashcardSet");
} else {
    FlashcardSet = mongoose.model<IFlashcardSet>("FlashcardSet", FlashcardSetSchema);
}

interface IFlashcard extends Document {
    flashcardSetId: Schema.Types.ObjectId;
    term: string;
    definition: string;
    createdAt: Date;
}

const FlashcardSchema: Schema = new Schema({
    flashcardSetId: {
        type: Schema.Types.ObjectId,
        ref: "FlashcardSet",
        required: true,
    },
    term: { type: String, required: true },
    definition: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

if (mongoose.models.Flashcard) {
    Flashcard = mongoose.model<IFlashcard>("Flashcard");
} else {
    Flashcard = mongoose.model<IFlashcard>("Flashcard", FlashcardSchema);
}

// Quiz Model
interface IQuizSet extends Document {
    pdfId: Schema.Types.ObjectId;
    title: string;
    description: string;
    createdAt: Date;
}

const QuizSetSchema: Schema = new Schema({
    pdfId: { type: Schema.Types.ObjectId, ref: "PDF", required: true },
    title: { type: String, required: true },
    description: { type: String },
    createdAt: { type: Date, default: Date.now },
});

if (mongoose.models.QuizSet) {
    QuizSet = mongoose.model<IQuizSet>("QuizSet");
} else {
    QuizSet = mongoose.model<IQuizSet>("QuizSet", QuizSetSchema);
}

interface IQuiz extends Document {
    quizSetId: Schema.Types.ObjectId;
    question: string;
    options: string[];
    answer: string;
    createdAt: Date;
}

const QuizSchema: Schema = new Schema({
    quizSetId: { type: Schema.Types.ObjectId, ref: "QuizSet", required: true },
    question: { type: String, required: true },
    options: { type: [String], required: true },
    answer: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

if (mongoose.models.Quiz) {
    Quiz = mongoose.model<IQuiz>("Quiz");
} else {
    Quiz = mongoose.model<IQuiz>("Quiz", QuizSchema);
}

// Note Model
interface INote extends Document {
    pdfId: Schema.Types.ObjectId;
    content: string;
    createdAt: Date;
}

const NoteSchema: Schema = new Schema({
    pdfId: { type: Schema.Types.ObjectId, ref: "PDF", required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

if (mongoose.models.Note) {
    Note = mongoose.model<INote>("Note");
} else {
    Note = mongoose.model<INote>("Note", NoteSchema);
}

export { PDF, FlashcardSet, Flashcard, QuizSet, Quiz, Note };
