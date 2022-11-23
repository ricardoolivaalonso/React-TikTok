export const DeleteIconElement = ({onMyClick}) => {
    return (
        <button className="delete-post" onClick={onMyClick}>
            <svg
                width="24px"
                height="24px"
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                <style
                    dangerouslySetInnerHTML={{
                    __html:
                        ".cls-1{fill:none;stroke:#161823;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px;}"
                    }}
                />
                </defs>
                <title />
                <g id="trash">
                <rect className="cls-1" height={22} width={18} x={7} y={7} />
                <line className="cls-1" x1={3} x2={29} y1={7} y2={7} />
                <line className="cls-1" x1={13} x2={19} y1={3} y2={3} />
                <line className="cls-1" x1={13} x2={13} y1={12} y2={22} />
                <line className="cls-1" x1={19} x2={19} y1={12} y2={22} />
                </g>
            </svg>
        </button>
    )
}
