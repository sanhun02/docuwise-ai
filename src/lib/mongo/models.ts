import mongoose, { Schema, Document, Model } from "mongoose";

// PDF Model
interface IPDF extends Document {
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

const PDF: Model<IPDF> =
    mongoose.models.PDF || mongoose.model<IPDF>("PDF", PDFSchema);

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

const FlashcardSet: Model<IFlashcardSet> =
    mongoose.models.FlashcardSet ||
    mongoose.model<IFlashcardSet>("FlashcardSet", FlashcardSetSchema);

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

const Flashcard: Model<IFlashcard> =
    mongoose.models.Flashcard ||
    mongoose.model<IFlashcard>("Flashcard", FlashcardSchema);

// Highlight Model
interface IHighlight extends Document {
    pdfId: Schema.Types.ObjectId;
    page: number;
    content: string;
    createdAt: Date;
}

const HighlightSchema: Schema = new Schema({
    pdfId: { type: Schema.Types.ObjectId, ref: "PDF", required: true },
    page: { type: Number, required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

const Highlight: Model<IHighlight> =
    mongoose.models.Highlight ||
    mongoose.model<IHighlight>("Highlight", HighlightSchema);

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

const QuizSet: Model<IQuizSet> =
    mongoose.models.QuizSet ||
    mongoose.model<IQuizSet>("QuizSet", QuizSetSchema);

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

const Quiz: Model<IQuiz> =
    mongoose.models.Quiz || mongoose.model<IQuiz>("Quiz", QuizSchema);

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

const Note: Model<INote> =
    mongoose.models.Note || mongoose.model<INote>("Note", NoteSchema);

export { PDF, FlashcardSet, Flashcard, Highlight, QuizSet, Quiz, Note };
