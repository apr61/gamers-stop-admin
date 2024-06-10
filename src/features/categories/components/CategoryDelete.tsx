import DeleteModal from "@/components/DeleteModal"
import { useDisclosure } from "@/hooks/useDisclosure"
import { selectCategoryCurrentItem } from "@/redux/slice/categorySlice"
import { useAppDispatch, useAppSelector } from "@/redux/store/hooks"

const CategoryDelete = () => {
	const {isOpen, close, open} = useDisclosure()
	const {status, action, record, error} = useAppSelector(selectCategoryCurrentItem)
	const handleCancel = () => {
		
	}
	const handleSubmit = async () => {
		
	}
	return (
		<DeleteModal handleCancel={handleCancel} onSubmit={handleSubmit} status={status} error={error} />
	)
}

export default CategoryDelete