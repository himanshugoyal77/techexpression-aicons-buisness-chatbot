import { useContext, useEffect, useState } from "react";
import { IoSend } from "react-icons/io5";
import { MessageContext } from "./context/MessageContext";

import { ChatCohere } from "@langchain/cohere";
import { RotatingLines } from "react-loader-spinner";

const data = [
  {
    "Transaction ID": 10001,
    Date: "2024-01-01",
    "Product Category": "Electronics",
    "Product Name": "iPhone 14 Pro",
    "Units Sold": 2,
    "Unit Price": 999.99,
    "Total Revenue": 1999.98,
    Region: "North America",
    "Payment Method": "Credit Card",
  },
  {
    "Transaction ID": 10002,
    Date: "2024-01-02",
    "Product Category": "Home Appliances",
    "Product Name": "Dyson V11 Vacuum",
    "Units Sold": 1,
    "Unit Price": 499.99,
    "Total Revenue": 499.99,
    Region: "Europe",
    "Payment Method": "PayPal",
  },
  {
    "Transaction ID": 10003,
    Date: "2024-01-03",
    "Product Category": "Clothing",
    "Product Name": "Levi's 501 Jeans",
    "Units Sold": 3,
    "Unit Price": 69.99,
    "Total Revenue": 209.97,
    Region: "Asia",
    "Payment Method": "Debit Card",
  },
  {
    "Transaction ID": 10004,
    Date: "2024-01-04",
    "Product Category": "Books",
    "Product Name": "The Da Vinci Code",
    "Units Sold": 4,
    "Unit Price": 15.99,
    "Total Revenue": 63.96,
    Region: "North America",
    "Payment Method": "Credit Card",
  },
  {
    "Transaction ID": 10005,
    Date: "2024-01-05",
    "Product Category": "Beauty Products",
    "Product Name": "Neutrogena Skincare Set",
    "Units Sold": 1,
    "Unit Price": 89.99,
    "Total Revenue": 89.99,
    Region: "Europe",
    "Payment Method": "PayPal",
  },
  {
    "Transaction ID": 10006,
    Date: "2024-01-06",
    "Product Category": "Sports",
    "Product Name": "Wilson Evolution Basketball",
    "Units Sold": 5,
    "Unit Price": 29.99,
    "Total Revenue": 149.95,
    Region: "Asia",
    "Payment Method": "Credit Card",
  },
  {
    "Transaction ID": 10007,
    Date: "2024-01-07",
    "Product Category": "Electronics",
    "Product Name": "MacBook Pro 16-inch",
    "Units Sold": 1,
    "Unit Price": 2499.99,
    "Total Revenue": 2499.99,
    Region: "North America",
    "Payment Method": "Credit Card",
  },
  {
    "Transaction ID": 10008,
    Date: "2024-01-08",
    "Product Category": "Home Appliances",
    "Product Name": "Blueair Classic 480i",
    "Units Sold": 2,
    "Unit Price": 599.99,
    "Total Revenue": 1199.98,
    Region: "Europe",
    "Payment Method": "PayPal",
  },
  {
    "Transaction ID": 10009,
    Date: "2024-01-09",
    "Product Category": "Clothing",
    "Product Name": "Nike Air Force 1",
    "Units Sold": 6,
    "Unit Price": 89.99,
    "Total Revenue": 539.94,
    Region: "Asia",
    "Payment Method": "Debit Card",
  },
  {
    "Transaction ID": 10010,
    Date: "2024-01-10",
    "Product Category": "Books",
    "Product Name": "Dune by Frank Herbert",
    "Units Sold": 2,
    "Unit Price": 25.99,
    "Total Revenue": 51.98,
    Region: "North America",
    "Payment Method": "Credit Card",
  },
  {
    "Transaction ID": 10011,
    Date: "2024-01-11",
    "Product Category": "Beauty Products",
    "Product Name": "Chanel No. 5 Perfume",
    "Units Sold": 1,
    "Unit Price": 129.99,
    "Total Revenue": 129.99,
    Region: "Europe",
    "Payment Method": "PayPal",
  },
];

const App = () => {
  const [input, setInput] = useState("");
  const { messages, setMessages } = useContext(MessageContext);
  const [response, setResponse] = useState(null);
  const [selected, setSelected] = useState("Track Order");

  const llm = new ChatCohere({
    model: "command-r-plus",
    temperature: 0,
    maxRetries: 2,
    apiKey: "t81XugtvwX4n0udWkE3NPzHSYrC3jk7AHb3gu",
  });

  const askLlm = async (query) => {
    setLoading(true);
    const res = await llm.invoke(`
      you are given json data of orders of ecommerce users 
      use this data to answer the follwing question.

      data is: [
  {
    "Transaction ID": 10001,
    "Date": "2024-01-01",
    "Product Category": "Electronics",
    "Product Name": "iPhone 14 Pro",
    "Units Sold": 2,
    "Unit Price": 999.99,
    "Total Revenue": 1999.98,
    "Region": "North America",
    "Payment Method": "Credit Card",
    "devilvery_status" : "shipping"
  },
  {
    "Transaction ID": 10002,
    "Date": "2024-01-02",
    "Product Category": "Home Appliances",
    "Product Name": "Dyson V11 Vacuum",
    "Units Sold": 1,
    "Unit Price": 499.99,
    "Total Revenue": 499.99,
    "Region": "Europe",
    "Payment Method": "PayPal",
    "devilvery_status" : "packaged"
  },
  {
    "Transaction ID": 10003,
    "Date": "2024-01-03",
    "Product Category": "Clothing",
    "Product Name": "Levi's 501 Jeans",
    "Units Sold": 3,
    "Unit Price": 69.99,
    "Total Revenue": 209.97,
    "Region": "Asia",
    "Payment Method": "Debit Card",
    "devilvery_status" : "shipping"
  },
  {
    "Transaction ID": 10004,
    "Date": "2024-01-04",
    "Product Category": "Books",
    "Product Name": "The Da Vinci Code",
    "Units Sold": 4,
    "Unit Price": 15.99,
    "Total Revenue": 63.96,
    "Region": "North America",
    "Payment Method": "Credit Card",
    "devilvery_status" : "delivered"
  },
  {
    "Transaction ID": 10005,
    "Date": "2024-01-05",
    "Product Category": "Beauty Products",
    "Product Name": "Neutrogena Skincare Set",
    "Units Sold": 1,
    "Unit Price": 89.99,
    "Total Revenue": 89.99,
    "Region": "Europe",
    "Payment Method": "PayPal",
    "devilvery_status" : "shipping"
  },
  {
    "Transaction ID": 10006,
    "Date": "2024-01-06",
    "Product Category": "Sports",
    "Product Name": "Wilson Evolution Basketball",
    "Units Sold": 5,
    "Unit Price": 29.99,
    "Total Revenue": 149.95,
    "Region": "Asia",
    "Payment Method": "Credit Card",
    "devilvery_status" : "shipping"
  },
  {
    "Transaction ID": 10007,
    "Date": "2024-01-07",
    "Product Category": "Electronics",
    "Product Name": "MacBook Pro 16-inch",
    "Units Sold": 1,
    "Unit Price": 2499.99,
    "Total Revenue": 2499.99,
    "Region": "North America",
    "Payment Method": "Credit Card",
    "devilvery_status" : "shipping"
  },
  {
    "Transaction ID": 10008,
    "Date": "2024-01-08",
    "Product Category": "Home Appliances",
    "Product Name": "Blueair Classic 480i",
    "Units Sold": 2,
    "Unit Price": 599.99,
    "Total Revenue": 1199.98,
    "Region": "Europe",
    "Payment Method": "PayPal",
    "devilvery_status" : "shipping"
  },
  {
    "Transaction ID": 10009,
    "Date": "2024-01-09",
    "Product Category": "Clothing",
    "Product Name": "Nike Air Force 1",
    "Units Sold": 6,
    "Unit Price": 89.99,
    "Total Revenue": 539.94,
    "Region": "Asia",
    "Payment Method": "Debit Card",
    "devilvery_status" : "delivered"
  },
  {
    "Transaction ID": 10010,
    "Date": "2024-01-10",
    "Product Category": "Books",
    "Product Name": "Dune by Frank Herbert",
    "Units Sold": 2,
    "Unit Price": 25.99,
    "Total Revenue": 51.98,
    "Region": "North America",
    "Payment Method": "Credit Card",
    "devilvery_status" : "arriving today"
  },
  {
    "Transaction ID": 10011,
    "Date": "2024-01-11",
    "Product Category": "Beauty Products",
    "Product Name": "Chanel No. 5 Perfume",
    "Units Sold": 1,
    "Unit Price": 129.99,
    "Total Revenue": 129.99,
    "Region": "Europe",
    "Payment Method": "PayPal",
    "devilvery_status" : "arriving on monday"
  }
]


      question is: ${query}
      `);

    console.log("res", res);
    setResponse(res.content);
    setMessages((prev) => [
      ...prev,
      {
        message: res.content,
        sender: "bot",
        type: "text",
      },
    ]);

    setLoading(false);
  };

  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    const lastmessage = messages[messages.length - 1].message;
    const query = lastmessage + input;
    console.log("query", query);
    setLoading(true);
    console.log("selected", selected);
    if (selected === "Track order") {
      askLlm(query);
    } else if (selected === "File a complaint") {
      fileComplent(query);
    } else {
      const res = await llm.invoke(query);
      setMessages((prev) => [
        ...prev,
        {
          message: input,
          sender: "user",
          type: "text",
        },
        {
          message: res.content,
          sender: "bot",
          type: "text",
        },
      ]);
      setInput("");
    }
  };

  const fileComplent = async (query) => {
    const res = await llm.invoke(
      `You are working a professional complaint resolver, Help customers to resolve thier queries. respond with proper customer service
      user is asking for: ${query}`
    );

    setMessages((prev) => [
      ...prev,
      {
        message: res.content,
        sender: "bot",
        type: "text",
      },
    ]);
  };

  useEffect(() => {
    messages[messages.length - 1].message === "Track order"
      ? setMessages((prev) => [
          ...prev,
          {
            message: "Please enter yout transaction Id",
            sender: "bot",
            type: "text",
          },
        ])
      : messages[messages.length - 1].message === "File a complaint"
      ? setMessages((prev) => [
          ...prev,
          {
            message: "Sorry for inconvenience, Write down your complent",
            sender: "bot",
            type: "text",
          },
        ])
      : messages[messages.length - 1].message === "Query a product"
      ? getProducts()
      : null;
  }, [messages]);

  const getProducts = async () => {
    const res = fetch("https://fakestoreapi.com/products");
    const response = await (await res).json();

    console.log("res", response.slice(0, 5));
    setMessages((prev) => [
      ...prev,
      {
        message: "here are some of our products, Click to get details",
        sender: "bot",
        type: "images",
        data: [...response.slice(0, 5)],
      },
    ]);
  };

  useEffect(() => {
    const scrollToBottom = (id) => {
      const element = document.getElementById(id);
      element.scrollTop = element?.scrollHeight;
    };
    scrollToBottom("chat");
  }, []);

  const getProductDetails = async (id) => {
    const res = fetch(`https://fakestoreapi.com/products/${id}`);
    const response = await (await res).json();
    console.log("single", response);
    const format = await llm.invoke(
      `You are working a professional complaint resolver, Help customers to resolve thier queries. respond with proper customer service
      you are given a json product details
      use this product information and give its details to customer
      
      product details : ${response.title}, ${response.description}
      `
    );

    setMessages((prev) => [
      ...prev,
      {
        message: format.content,
        sender: "bot",
        type: "text",
      },
    ]);
  };

  return (
    <div className=" h-screen w-full flex justify-center items-center ">
      <div className="relative border h-[98%] w-11/12 m-10 px-3 py-10 rounded-xl bg-[#F5F5F5]">
        <div id="chat" className="flex flex-col overflow-x-scroll h-[90%]">
          {messages.map((msg, index) => (
            <div key={index}>
              <div
                className={`chat ${
                  msg.sender === "bot" ? "chat-start" : "chat-end"
                }`}
              >
                <div className="chat-image avatar">
                  <div className="w-8 rounded-full border-black">
                    <img
                      alt="Tailwind CSS chat bubble component"
                      src={
                        msg.sender === "bot"
                          ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdMKUTpLXL-FypMWGBA8xpclPj_yFAq7KVYaP7Flluinia-NDWEBgvm6r42pxLHxAMfPg&usqp=CAU"
                          : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSK0UsIYLqVZC1LK3xAHo7KYBHNW88i3GBpJw&s"
                      }
                    />
                  </div>
                </div>
                <div
                  className={`chat-bubble 
                  ${msg.sender !== "bot" ? "chat-bubble-success" : null}
                  `}
                >
                  {messages[messages.length - 1] === "Track order"
                    ? "please enter your Transaction ID"
                    : msg.message}
                </div>
              </div>
              {msg.type === "multiple" && (
                <div className="flex flex-col gap-1 w-1/2 ml-12 mt-2">
                  {msg.options.map((option, index) => (
                    <button
                      onClick={() => {
                        setSelected(option.label);
                        setMessages((prev) => [
                          ...prev,
                          {
                            message: option.label,
                            sender: "user",
                            type: "text",
                          },
                        ]);
                      }}
                      key={index}
                      className="border-2 border-black p-2 rounded-xl"
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}

              {msg.type === "images" && (
                <div className="w-[300px] grid grid-cols-3 gap-2 ml-12 cursor-pointer">
                  {msg.data.map((product) => {
                    return (
                      <div
                        key={product.id}
                        onClick={() => {
                          setLoading(true);
                          setMessages((prev) => [
                            ...prev,
                            {
                              message: product.title,
                              sender: "user",
                              type: "test",
                            },
                          ]);
                          getProductDetails(product.id);
                          setLoading(false);
                        }}
                        className="flex flex-col border p-2 bg-[#F2EFE7] rounded-lg"
                      >
                        <img
                          className="w-full h-1/2"
                          src={product.image}
                          alt=""
                        />
                        {product.title.toString().slice(0, 10)}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="mt-auto absolute bottom-0 w-full p-3 flex justify-between items-center gap-4 px-20">
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            type="text"
            placeholder="Enter your message..."
            className="relative w-full p-2 border-2 border-black rounded-xl"
          />
          <button
            onClick={handleClick}
            className="border-2 border-black p-2 rounded-full"
          >
            <IoSend />
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
