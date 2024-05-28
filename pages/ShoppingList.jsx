import React from "react"
import SingleList from "./SingleList"
import imageURL from "../assets/add-to-cart.png"

export default function ShoppingList() {
    const [categories, setCategories] = React.useState([])
    const [currentInput, setCurrentInput] = React.useState({
        categoryIndex: 0,
        item: ""
    })
    const [shoppingMode, setShoppingMode] = React.useState(false)
    
    React.useEffect(() => {
        const savedList = localStorage.getItem("list")
        if(savedList) setCategories(JSON.parse(savedList))
    }, [])
    React.useEffect(() => {
        localStorage.setItem("list", JSON.stringify(categories))
    },[categories])
    
    function handleItemChange(event) {
        setCurrentInput(prev => ({...prev, item: event.target.value}))
    }
    function handleSelectChange(event) {
        setCurrentInput(prev => ({...prev, categoryIndex: Number(event.target.value)}))
    }
    function handleSubmit(event) {
        event.preventDefault()
        if(currentInput.item.length === 0) return;
        if(categories[currentInput.categoryIndex].content.includes(currentInput.item)) {
            console.log("doppelt")
        } else {
            setCategories(prev => {
                return prev.map((cat, index) => {
                    if(index === currentInput.categoryIndex)  {
                        return {...cat, content: cat.content.concat(currentInput.item)}
                    }
                    else return cat
                })
            })
            setCurrentInput(prev => ({...prev, item:""}))
        }
    }
    function deleteItem(catId, itemId) {
        setCategories(prev => {
            return prev.map((cat, catNum) => {
                if(catNum !== catId) return cat
                return {...cat, content: cat.content.filter((a,i) => i !== itemId)}
            })
        })
    }
    function remoteSelect(id) {
        setCurrentInput(prev => ({...prev, categoryIndex: id}))
    }
    const selectOptions = categories.map((option,index) => 
        <option 
            key={index} 
            value={index}
        >{option.name}</option>
        )

    const nada = categories.map((cat, index) => <SingleList cat={cat} key={index} index={index} deleteItem={(itemId) => deleteItem(index, itemId)} remoteSelect={() =>remoteSelect(index)}  />)
    
    return (
        <div className="container">
        <img src={imageURL} onClick={() => setShoppingMode(prev => !prev)} />
        {
            shoppingMode &&
            
            <form 
                className="container shopping--form" 
                onSubmit={handleSubmit}
            >
                <select 
                    className="shopping--select"
                    onChange={handleSelectChange}
                    value={currentInput.categoryIndex}
                >
                    {
                       selectOptions 
                    }
                </select>
                <input 
                    type="text"
                    placeholder="..."
                    className="shoppingInput"
                    onChange={handleItemChange}
                    value={currentInput.item}
                />
                <button 
                    type="submit"
                    className="shoppingInput"
                    >Speichern</button>
            </form>
        }
            <ul className="shopping--list">
                {nada}
            </ul>
        </div>
    )
}