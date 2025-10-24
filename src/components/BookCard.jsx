import { useState } from "react";

export default function BookCard({ book, onEdit, onDelete }) {
    const [edit, setEdit] = useState(false);
    const [draft, setDraft] = useState(book);

    const handleSubmit = (e) => {
        e.preventDefault();
        onEdit(draft);
        setEdit(false);
    };

    return (
        <div className="rounded-xl border bg-white p-4 shadow-sm">
            {!edit ? (
                <div className="space-y-3">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800">{book.title}</h3>
                        <p className="text-slate-600 text-sm">by {book.author}</p>
                        <p className="text-slate-600 text-sm">Category: {book.category}</p>
                        <p className="text-slate-600 text-sm">Price: Ksh {book.price}</p>
                        <p className="text-slate-600 text-sm">Year: {book.publishedYear}</p>
                        <p className="text-slate-600 text-sm">Publisher: {book.publisher}</p>
                        <p className="text-slate-600 text-sm">
                            Stock: {book.stockQuantity} {book.inStock ? "✅" : "❌"}
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <button 
                            onClick={() => setEdit(true)} 
                            className="border px-3 py-1 rounded-lg text-sm hover:bg-gray-50"
                        >
                            Edit
                        </button>
                        <button 
                            onClick={() => onDelete(book._id)} 
                            className="bg-red-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-700"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                    <input 
                        className="border rounded-lg px-3 py-1 w-full text-sm"
                        value={draft.title}
                        onChange={e => setDraft({ ...draft, title: e.target.value })}
                        placeholder="Title"
                    />
                    <input 
                        className="border rounded-lg px-3 py-1 w-full text-sm"
                        value={draft.author}
                        onChange={e => setDraft({ ...draft, author: e.target.value })}
                        placeholder="Author"
                    />
                    <input 
                        className="border rounded-lg px-3 py-1 w-full text-sm"
                        value={draft.category}
                        onChange={e => setDraft({ ...draft, category: e.target.value })}
                        placeholder="Category"
                    />
                    <input 
                        className="border rounded-lg px-3 py-1 w-full text-sm"
                        value={draft.price}
                        onChange={e => setDraft({ ...draft, price: Number(e.target.value) })}
                        placeholder="Price"
                        type="number"
                    />
                    <input 
                        className="border rounded-lg px-3 py-1 w-full text-sm"
                        value={draft.publishedYear}
                        onChange={e => setDraft({ ...draft, publishedYear: Number(e.target.value) })}
                        placeholder="Published Year"
                        type="number"
                    />
                    <input 
                        className="border rounded-lg px-3 py-1 w-full text-sm"
                        value={draft.publisher}
                        onChange={e => setDraft({ ...draft, publisher: e.target.value })}
                        placeholder="Publisher"
                    />
                    <input 
                        className="border rounded-lg px-3 py-1 w-full text-sm"
                        value={draft.stockQuantity}
                        onChange={e => setDraft({ ...draft, stockQuantity: Number(e.target.value) })}
                        placeholder="Stock Quantity"
                        type="number"
                    />
                    
                    <div className="flex gap-2">
                        <button className="bg-green-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-green-700">
                            Save
                        </button>
                        <button 
                            type="button" 
                            onClick={() => setEdit(false)} 
                            className="border px-3 py-1 rounded-lg text-sm hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}