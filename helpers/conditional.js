// Conditional rendering helper
export function If({children, ...props})
{
    if (props.condition)
        return children;
    return null;
}
