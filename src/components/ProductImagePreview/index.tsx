import { useState } from "react";

type ProductPreviewImageProps = {
	images: string[];
	name: string;
};

const ProductPreviewImage = ({ images, name }: ProductPreviewImageProps) => {
	const [image, setImage] = useState<number>(0);

	return (
		<div className="flex gap-2 flex-col items-center w-full sticky top-[4rem] md:max-w-[25rem] md:items-start h-fit">
			<div
				className={`max-w-[25rem] w-full h-[25rem] rounded-sm overflow-hidden flex hover:brightness-[85%] transition-all`}
			>
				{images.map((img, ind) => (
					<img
						key={`${img}-${ind}`}
						style={{ transform: `translateX(-${image * 100}%)` }}
						src={img}
						alt={name}
						className="w-full h-full object-cover transistion-transform ease-in-out duration-150"
						loading="lazy"
					/>
				))}
			</div>
			<div className="flex gap-2 items-center">
				{images.map((img, ind) => (
					<div
						key={`${img}-${ind}`}
						className={`w-24 h-24 rounded-sm overflow-hidden cursor-pointer hover:brightness-[85%] transition-all ${image === ind ? "brightness-[85%]" : ""}`}
					>
						<img
							key={img + ind}
							src={img}
							alt={name}
							className="w-full h-full object-cover"
							loading="lazy"
							onClick={() => setImage(ind)}
						/>
					</div>
				))}
			</div>
		</div>
	);
};

export default ProductPreviewImage;
