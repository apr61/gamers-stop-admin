import { useState } from "react";

export const useDisclosure = (init?: boolean) => {
	const [isOpen, setOpen] = useState(init ? init : false);
	const open = () => setOpen(true);
	const close = () => setOpen(false);
	const toggle = () => setOpen((prev) => !prev);
	return { isOpen, open, close, toggle };
};
