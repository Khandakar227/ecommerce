"use client"
import { ChangeEvent, FormEvent, useEffect, useReducer } from "react"
import AddTags from "./__components/AddTags"
import ProductImageInput from "./__components/ProductImageInput"
import { useUser } from "@/lib/userContext";

interface ProductData {
    name: string;
    desc: string;
    vendor: string;
    category: string;
    price: number;
    available: number;
    unit: string;
    published: boolean;
    discount: number;
    imageSrc: string [];
    requireShipping: boolean;
    tags: string [];
  }
type Action = {
    type: string;
    payload: Partial<ProductData>;
};

const initialProductData:ProductData = {
    name: "",
    desc: "",
    vendor: "",
    category: "",
    price: 0,
    available: 0,
    unit: 'pcs',
    published: false,
    discount: 0,
    imageSrc: [],
    requireShipping: false,
    tags: [],
  }

const reducer = (state: ProductData, action: Action) => {
    return { ...state, ...action.payload };
};

function AddProduct() {
  const { user } = useUser();
  const [product, dispatch] = useReducer(reducer, initialProductData);

  useEffect(() => {
    if (user && user.role == 'admin') dispatch({type: "CHANGE", payload: {published: true}})
  }, [user.role])

  useEffect(() => {
    console.log(product);
  }, [product]);
  
  function handleChange (e:ChangeEvent) {
    let propValue:any;
    const el = (e.target as HTMLInputElement);
    const propName = el.name;
    if (el.type == 'checkbox') {
        propValue = el.checked;
        
    } else
    propValue = el.value;
    
    dispatch({type: "CHANGE", payload: {[propName]: propValue}});
  }
  function handleSubmit (e:FormEvent) {
    e.preventDefault();
  }
  function setTags (__tags: string[]) {
    dispatch({type: "CHANGE", payload: {tags: __tags}})
  }
  return (
    <div>
        <form onSubmit={handleSubmit} className="p-4 shadow rounded-lg bg-white">
            <h1 className="text-2xl py-2 font-bold">Add new product</h1>
            <div className="py-2">
                <label className="text-sm font-medium" htmlFor="name">Product name:</label>
                <input type="text" onChange={handleChange} value={product.name} name="name" id="name" className="w-full p-2 border shadow-sm rounded-md focus:border-green-600 outline-none" required/>
            </div>
            <div className="py-2">
                <label className="text-sm font-medium" htmlFor="description">Product description:</label>
                <textarea onChange={handleChange} value={product.desc} name="desc" id="description" className="min-h-[10rem] w-full p-2 border shadow-sm rounded-md focus:border-green-600 outline-none" required/>
            </div>
            <div className="py-2">
                <label className="text-sm font-medium" htmlFor="vendor">Vendor:</label>
                <input type="text" onChange={handleChange} value={product.vendor} name="vendor" id="vendor" className="w-full p-2 border shadow-sm rounded-md focus:border-green-600 outline-none" required/>
            </div>
            <div className="py-2">
                    <label className="text-sm font-medium pr-4" htmlFor="price">Price:</label>
                    <input type="number" onChange={handleChange} value={product.price} name="price" id="price" className="w-full p-2 border shadow-sm rounded-md focus:border-green-600 outline-none" required/>
                </div>            
            <div className="grid gap-4 md:grid-cols-2 items-stretch">
                <div className="py-2">
                    <label className="text-sm font-medium pr-4" htmlFor="category">Category:</label>
                    <input type="text" onChange={handleChange} value={product.category} name="category" id="category" className="w-full p-2 border shadow-sm rounded-md focus:border-green-600 outline-none" required/>
                </div>
                <div className="py-2">
                    <label className="text-sm font-medium pr-4" htmlFor="category">Product quantity:</label>
                    <input type="number" onChange={handleChange} value={product.available} name="available" id="available" className="w-full p-2 border shadow-sm rounded-md focus:border-green-600 outline-none" required/>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 items-stretch">
                <div className="py-2">
                    <label className="text-sm font-medium pr-4" htmlFor="unit">Unit (pcs if given none):</label>
                    <input type="text" onChange={handleChange} value={product.unit} name="unit" id="unit" placeholder="pcs/kg/litre" className="w-full p-2 border shadow-sm rounded-md focus:border-green-600 outline-none" required/>
                    </div>
                <div className="py-2">
                    <label className="text-sm font-medium pr-4" htmlFor="discount">Discount (%):</label>
                    <input type="number" onChange={handleChange} value={product.discount} name="discount" id="discount" placeholder="0" className="w-full p-2 border shadow-sm rounded-md focus:border-green-600 outline-none" required/>
                </div>
            </div>

            <div className="py-2">
                <input className="m-2" type="checkbox" onChange={handleChange} checked={product.requireShipping} name="requireShipping" id="requireShipping"/>
                <label className="font-medium pr-4" htmlFor="requireShipping">Shipping required</label>

                <input className="m-2" type="checkbox" onChange={handleChange} checked={product.published} name="published" id="Publish" />
                <label className="font-medium pr-4" htmlFor="Publish">Publish Now</label>
            </div>
            <div className="py-2">
                <ProductImageInput />
            </div>
            <div className="py-2">
                <AddTags tags={product.tags} setTags={setTags}/>
            </div>
            <div className="py-2">
                <button type="submit" className="font-semibold bg-green-600 text-white px-8  py-3 rounded-lg"> Add product </button>
            </div>
        </form>
    </div>
  )
}

export default AddProduct