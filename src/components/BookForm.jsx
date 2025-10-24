import { useState } from "react";

export default function BookForm({ onSubmit }) {
    const [form, setForm] = useState({ 
        title: "", 
        author: "", 
        category: "", 
        price: "", 
        publishedYear: "", 
        publisher: "", 
        stockQuantity: "",
        inStock: true 
    });

    const handleChange = e => {
        const { name, value } = e.target;
        setForm(f => ({ ...f, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.title || !form.author || !form.category || !form.price) return;

        onSubmit({
            ...form, 
            price: Number(form.price),
            publishedYear: Number(form.publishedYear),
            stockQuantity: Number(form.stockQuantity),
            inStock: form.stockQuantity > 0
        });
        setForm({ 
            title: "", 
            author: "", 
            category: "", 
            price: "", 
            publishedYear: "", 
            publisher: "", 
            stockQuantity: "",
            inStock: true 
        });
    };

    return (
        <form onSubmit={handleSubmit} className="rounded-xl border bg-white p-4 flex flex-wrap gap-2 mb-6">
            <input 
                name="title" 
                value={form.title} 
                onChange={handleChange} 
                placeholder="Book Title" 
                className="border rounded-lg px-3 py-2 flex-1 min-w-[200px]"
            />

            <input 
                name="author"
                value={form.author}
                onChange={handleChange}
                placeholder="Author" 
                className="border rounded-lg px-3 py-2 flex-1 min-w-[200px]"
            />

            <input 
                name="category"
                value={form.category}
                onChange={handleChange}
                placeholder="Category" 
                className="border rounded-lg px-3 py-2 flex-1 min-w-[200px]"
            />

            <input 
                name="price"
                value={form.price}
                onChange={handleChange}
                placeholder="Price" 
                className="border rounded-lg px-3 py-2 w-24"
                type="number"
            />

            <input 
                name="publishedYear"
                value={form.publishedYear}
                onChange={handleChange}
                placeholder="Year" 
                className="border rounded-lg px-3 py-2 w-24"
                type="number"
            />

            <input 
                name="publisher"
                value={form.publisher}
                onChange={handleChange}
                placeholder="Publisher" 
                className="border rounded-lg px-3 py-2 flex-1 min-w-[200px]"
            />

            <input 
                name="stockQuantity"
                value={form.stockQuantity}
                onChange={handleChange}
                placeholder="Stock" 
                className="border rounded-lg px-3 py-2 w-24"
                type="number"
            />

            <button className="bg-blue-600 text-white text-sm rounded-lg px-4 py-2 hover:bg-blue-700">
                Add Book
            </button>
        </form>
    );
}