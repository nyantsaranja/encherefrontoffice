export const FormHeaderComponent = ({title,description}) => {
    return (
        <div className="header-body">
            <p className="header-subtitle">
                {description}
            </p>
        </div>
    )
}