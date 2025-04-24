import { HTMLProps } from "react";

export default function TextArea({ ...rest }: HTMLProps<HTMLTextAreaElement>) {
  return (
    <textarea
      className="bg-white w-full h-42 resize-none p-2 rounded-md  text-black outline-none whitespace-pre-wrap"
      {...rest}
    ></textarea>
  );
}
