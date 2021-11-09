export default function Cell({details,updateFlag}) {
    const style={
        cellStyle:{
            width:40,height:40,backgroundColor:'grey',border:'1px solid white',
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            fontSize:'20px',
        },
    }
    
    return (
        <div style={style.cellStyle} onClick={x => console.log(details)} onContextMenu={(e)=>updateFlag(e)}>
            {details.value}
        </div>
    )
}
