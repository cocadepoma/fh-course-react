import React from "react";

// Con memo, el componente sólo se volverá a renderizar si sus properties cambian
export const Small = React.memo(({ value }) => {
    console.log("hola");
    return <small>{value}</small>;
});
