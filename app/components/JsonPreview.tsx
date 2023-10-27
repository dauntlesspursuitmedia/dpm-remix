export const JsonPreview =(props: any) => {
	return (
		<pre>{JSON.stringify(props, null, 2)}</pre>
	)
}
