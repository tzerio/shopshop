import React from "react"

export default function Categories() {
    const [categories, setCategories] = React.useState([])
    const [newCategoryInput, setNewCategoryInput] = React.useState("")
    React.useEffect(() => {
        const savedList = localStorage.getItem("list")
        if(savedList) setCategories(JSON.parse(savedList))
    }, [])
    React.useEffect(() => {
        localStorage.setItem("list", JSON.stringify(categories))
    },[categories])
    function handleNewCategorySubmit(event) {
        event.preventDefault()
        if(newCategoryInput.length > 0) {
            if(!categories.includes(item => item.name === newCategoryInput.trim())) {
                setCategories(prev => {
                    return [
                        ...prev,
                        {name:newCategoryInput.trim(), content: []}
                    ]   
               }) 
               setNewCategoryInput("")
            }
        }
    }
    function handleCategoryChange(event) {
        setNewCategoryInput(event.target.value)
    }
    function moveUp(index) {
        if(index === 0) return;
        setCategories(prev => {
            const newCats = []
            for ( let i = 0; i < prev.length; i++) {
                if(i !== index - 1) {
                    newCats.push(prev[i])
                } else {
                    newCats.push(prev[index])
                    newCats.push(prev[i])
                    i++;
                }
            }
            return newCats
        })
    }
    function moveDown(index) {
        if(index===categories.length - 1) return;
        setCategories(prev => {
            const newCats = [...prev]
            const temp = prev[index]
            newCats[index] = prev[index + 1]
            newCats[index + 1] = temp
            return newCats
        })
    }
    function deleteCategory(index) {
        setCategories(prev => prev.filter((cat, id) => id !== index))
    }
    const displayedCategories = categories.map((cat,index) => 
    <tr key={index}>
        <td>{cat.name} </td>
        <td> 
        {
            index !== 0 &&
            <button 
                className="arrow-button button" 
                onClick={() => moveUp(index)}>
                    &#11014;
            </button>
        }
        </td>
        <td>
        {
            index !== categories.length - 1 &&
            <button 
                className="arrow-button button"
                onClick={() => moveDown(index)}>
                    &#11015; 
                </button>
        }
        </td>
        <td>
            <button 
                className="arrow-button button red-border"
                onDoubleClick={() => deleteCategory(index)}>
                    &otimes;
                </button>
        </td>
    </tr>
    )
    
    return (
        <div className="container category--manager">
            {categories.length === 0 && <span>Lege zum Anfangen eine Kategorie an</span>}
            <form className="container category--form" onSubmit={handleNewCategorySubmit}>
                <input type="text" placeholder="neue Kategorie..." value={newCategoryInput} onChange={handleCategoryChange}/>
                <input className="button" type="submit" value="Hinzufügen" />
            </form>
            <div className="container">
                <table className="category--table">
                    <thead>
                    <tr>
                        <th>Kategorie</th>
                        <th colSpan="3">Optionen</th>
                    </tr>
                    </thead>
                    <tbody>
                        {displayedCategories}
                    </tbody>
                </table>
            
                <p className="explain">&#11014; Kategorie nach oben verschieben</p>
                <p className="explain">&#11015; Kategorie nach unten verschieben</p>
                <p className="explain">&otimes; Kategorie löschen</p>
            </div>
        </div>
    )
}