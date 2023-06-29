function AddProduct() {
  return (
    <div>
        <form className="p-4 shadow rounded-lg bg-white">
            <h1 className="text-2xl py-2 font-bold">Add new product</h1>
            <div className="py-2">
                <label className="text-sm font-medium" htmlFor="name">Product name:</label>
                <input type="text" name="name" id="name" className="w-full p-2 border shadow-sm rounded-md focus:border-green-600 outline-none" />
            </div>
            <div className="py-2">
                <label className="text-sm font-medium" htmlFor="description">Product description:</label>
                <textarea name="desc" id="description" className="min-h-[10rem] w-full p-2 border shadow-sm rounded-md focus:border-green-600 outline-none" />
            </div>
            <div className="py-2">
                <label className="text-sm font-medium" htmlFor="vendor">Vendor:</label>
                <input type="text" name="vendor" id="vendor" className="w-full p-2 border shadow-sm rounded-md focus:border-green-600 outline-none" />
            </div>
            <div className="grid gap-4 md:grid-cols-2 items-stretch">
                <div className="py-2">
                    <label className="text-sm font-medium pr-4" htmlFor="category">Category:</label>
                    <input type="text" name="category" id="category" className="w-full p-2 border shadow-sm rounded-md focus:border-green-600 outline-none" />
                </div>
                <div className="py-2">
                    <label className="text-sm font-medium pr-4" htmlFor="category">Available Product:</label>
                    <input type="number" name="available" id="available" className="w-full p-2 border shadow-sm rounded-md focus:border-green-600 outline-none" />
                </div>
            </div>
        </form>
    </div>
  )
}

export default AddProduct