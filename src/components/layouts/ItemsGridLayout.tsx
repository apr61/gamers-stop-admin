type ItemsGridLayoutProps = {
    children: React.ReactNode;
};

const ItemsGridLayout = ({ children }: ItemsGridLayoutProps) => {
    return (
        <div className="grid gap-4 w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4">
            {children}
        </div>
    );
};

export default ItemsGridLayout;
