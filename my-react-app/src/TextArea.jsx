const TextArea =({type,name,defaultValue,onChange,onClick,placeholder,className,rows,cols,required=true}) => {
    return (
        <textarea
            type={type}
            id={name}
            name={name}
            rows={rows}
            cols={cols}
            className={className}
            placeholder={placeholder}
            defaultValue={defaultValue || ''}
            onChange={onChange}
            onClick={onClick}
            required={required}
            />
    )
  }

  export default TextArea
