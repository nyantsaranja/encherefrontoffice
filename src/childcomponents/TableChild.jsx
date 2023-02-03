export const TableChild = ({titre, headers, rows, buttons,userDefinedButton}) => {
    const ev = (id,button) => {
      button.event(id);
    }

    return (
        <>
            <h5>{titre}</h5>
            <br/>
            <div className="table-wrapper-scroll-y my-custom-scrollbar">

                <table className="table table-bordered">
                <thead>
                <tr>
                    {headers.map((header, index) => (
                        <th key={index}>{header}</th>
                    ))}
                    {
                        (buttons!==null && buttons!==undefined) && buttons.map((button, t) => (
                            <th key={t}></th>
                        ))
                    }
                    {
                        (userDefinedButton!==null && userDefinedButton!==undefined) && <th></th>
                    }
                </tr>
                </thead>
                <tbody>
                {rows.map((row, i) => (
                    <tr key={i}>
                        {row.map((cell, j) => (
                            <td key={j}>{cell}</td>
                        ))}
                            {
                                (buttons!==null && buttons!==undefined) && buttons.map((button, t) => (
                                    <td key={t}>
                                    <button className={button.className} onClick={()=>
                                    ev(row[0],button)
                                    }>
                                        <i className={button.icon}></i> {button.value}
                                    </button>
                                    </td>
                                ))
                            }
                        {
                            (userDefinedButton!==null && userDefinedButton!==undefined) && <td> <button className={userDefinedButton.className} onClick={()=> userDefinedButton.event(row[0])}>{userDefinedButton.value}</button></td>
                        }
                    </tr>
                ))}
                </tbody>
                </table>

            </div>
        </>
    )
}