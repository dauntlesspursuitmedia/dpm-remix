
import groq from "groq";
import { z } from "zod"

export const columnsPropsZ = z.object({
	_type: z.literal("columns"),
	_key: z.string(),
})

export const ColumnsQuery = groq`
	_type == "columns" => {
		_type,
		_key
	}
`;
export type ColumnsProps = z.infer<typeof columnsPropsZ>
export const ColumnsSection = ({_type,_key}: ColumnsProps) => {
	return (
		<div>columns section</div>
	)
}
