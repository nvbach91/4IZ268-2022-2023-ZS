import Category from './Category'

const Categories = ({ category, onToggle }) => {
    return (
        <>
            {categories.map((category, index) => (
                <Category key={index} category={category} onToggle={onToggle} />
            ))}
        </>
    )
}

export default Categories