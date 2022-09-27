import React from 'react';

export default function EmptyTr(props) {
  return (
    <tr style={{ height: "198px", position: "relative" }}>
      <td
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          color: "rgba(97,112,128,1)",
          fontFamily: "NotoSansJP-Regular",
          fontSize: "16px",
          fontWeight: 400,
          fontStyle: "normal",
          letterSpacing: "1px",
        }}>
        {
          props.text
        }
      </td>
    </tr>
  )
}
