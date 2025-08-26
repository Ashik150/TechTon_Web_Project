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

  const handleMessageSubmit = async () => {
    if (user) {
      const groupTitle = data._id + user._id;
      const userId = user._id;
      const sellerId = data.shop._id;
      console.log("userID: ", userId);
      console.log("sellerID: ", sellerId);
      console.log("groupTitle: ", groupTitle);
      await axios
        .post(`${server}/conversation/create-new-conversation`, {
          groupTitle,
          userId,
          sellerId,
        })
        .then((res) => {
          console.log("success");
          navigate(`/inbox?${res.data.conversation._id}`);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    } else {
      toast.error("Please login to create a conversation");
    }
  };

  const removeFromWishlistHandler = (data) => {
    setClick(!click);
    dispatch(removeFromWishlist(data));
  };

  const addToWishlistHandler = (data) => {
    setClick(!click);
    dispatch(addToWishlist(data));
  };

  const addToCartHandler = (id) => {
    const isItemExists = cart && cart.find((i) => i._id === id);
    if (isItemExists) {
      toast.error("Item already in cart!");
    } else {
      if (data.stock < 1) {
        toast.error("Product stock limited!");
      } else {
        const cartData = { ...data, qty: count };
        dispatch(addTocart(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  };
  // Calculate total reviews and ratings
  const totalReviewsLength =
    products &&
    products.reduce((acc, product) => acc + product.reviews.length, 0);

  const totalRatings =
    products &&
    products.reduce(
      (acc, product) =>
        acc + product.reviews.reduce((sum, review) => sum + review.rating, 0),
      0
    );
  const avg = totalRatings / totalReviewsLength || 0;
  const averageRating = avg.toFixed(2);
  console.log(averageRating);

  return (
    <div>
      <div className="w-full 800px:w-[50%]">
        <img
          src={`${data && data.images[select]?.url}`}
          alt=""
          className="w-[80%]"
        />
        <div className="w-full flex">
          {data &&
            data.images.map((i, index) => (
              <div
                className={`${select === 0 ? "border" : "null"} cursor-pointer`}
              >
                <img
                  src={`${i?.url}`}
                  alt=""
                  className="h-[200px] overflow-hidden mr-3 mt-3"
                  onClick={() => setSelect(index)}
                />
              </div>
            ))}
          <div
            className={`${select === 1 ? "border" : "null"} cursor-pointer`}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
