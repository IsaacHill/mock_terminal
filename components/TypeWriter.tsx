import { ReactChild, useEffect, useState, useRef } from "react";

interface TypeWriterProps {
    speed: number
    children : string
}
export function TypeWriter(props: TypeWriterProps) {
    const {speed} = props
    const [current, setCurrent] = useState<string>("");
    const [letter_index, setLetterIndex] = useState(0);
    const indexRef = useRef(letter_index);
    const stringRef = useRef(current);
    indexRef.current = letter_index;
    stringRef.current = current;

    useEffect(() => {
        setCurrent("");
        setLetterIndex(0);
    }, [props.children]);
    
    useEffect(() => {
        if (current.length != props.children.length) {
            const timeout = setTimeout(() => {
                setCurrent(stringRef.current+props.children[letter_index])
                setLetterIndex(letter_index+1);
            }, speed)
            return () => clearTimeout(timeout);
        }
      }, [current, letter_index]);

    return <p>{current}</p>
}