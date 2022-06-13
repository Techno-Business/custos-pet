import React, { createRef } from "react";

export const navigationRef = createRef();

export function navigate(name, params) {
    navigationRef.current?.navigate(name, params);
}

export function replace(name, params) {
    navigationRef.current?.reset({
       index: 0,
       routes: [{ name, params }],
    });
}