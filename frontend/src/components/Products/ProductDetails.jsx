import React, { useEffect, useState } from "react";
const ProductDetails = ({ data }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [Seller, setSeller] = useState("");
  const [select, setSelect] = useState(1);
  const navigate = useNavigate();
  const { products } = useSelector((state) => state.products);
  const { seller } = useSelector((state) => state.seller);
  const { user } = useAuthStore();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProductsShop(data && data?.shop._id));
    if (wishlist && wishlist.find((i) => i._id === data?._id)) {
      setClick(true);
    } else {
      setClick(false);
    }

    if (data && data.shop && seller && seller._id === data.shop._id) {
      setSeller(seller); // Set the entire seller object
    }
  }, [data, wishlist, seller]);

  console.log("Seller: ", Seller.avatar?.url);

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };
  // Increment the product count
  // If the product count is less than the product stock, increment the count

  const incrementCount = () => {
    if (count < data.stock) {
      setCount(count + 1);
    } else {
      toast.error("Product stock limited");
    }
  };

  return (
    <div>
      <h1>Product Details</h1>
    </div>
  );
};

export default ProductDetails;
