import { useState } from "react";
import "./App.css";
import { Blurhash } from "react-blurhash";

type BlurHashImage = {
  url: string;
  hash: string;
};

const blurHashes: BlurHashImage[] = [
  {
    url: "https://images.unsplash.com/photo-1682685795463-0674c065f315?q=80&w=3126&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    hash: "U23u7jn*0#xaI;j@xYR*0#oe^ORk=_WCENxa",
  },
  {
    url: "https://images.unsplash.com/photo-1682687980976-fec0915c6177?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    hash: "U.Gv-H%fIoRk~XxtNGWW$$jFWWofa$WCoLoe",
  },
  {
    url: "https://images.unsplash.com/photo-1699637341383-8a67b4d1adf3?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    hash: "U:K-IqJ7T0slPXxaS4s90$V@r=W;w3aenNS$",
  },
  {
    url: "https://images.unsplash.com/photo-1682687221073-53ad74c2cad7?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    hash: "URI5xntlD%V@T}V@WAofMInhkCbHWXbwe.jF",
  },
  {
    url: "https://images.unsplash.com/photo-1699183977963-242cb79d4bc2?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    hash: "UsM?9sxZRka|~BazWCjt9cayj[jt$zoej[az",
  },
  {
    url: "https://images.unsplash.com/photo-1699452208069-c67c634b37a4?q=80&w=3164&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    hash: "U14Ldx0000~q~qIUD%%M00~q?b4T00_3~q4n",
  },
];

const GAP = "20px";

function App() {
  const [imageLoaded, setImageLoaded] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [imageURL, setImageURL] = useState(
    "https://images.unsplash.com/photo-1694950888587-7dc43b3f30c8?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  );
  const [blurHash, setBlurHash] = useState(
    "U6G,9Z5PoO%300~DWTEK0055a_-W={-X?HNG"
  );
  const [isGenerating, setIsGenerating] = useState(false);

  const handleURLChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImageURL(event.target.value);
  };

  const generateBlurHash = async () => {
    setIsGenerating(true);
    try {
      // Check if imageURL is not empty
      if (!imageURL) {
        alert("Please enter an image URL.");
        return;
      }

      const response = await fetch(
        `${import.meta.env.VITE_WORKFLOW_URL}?url=${encodeURIComponent(
          imageURL
        )}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const hash = await response.text();
      setBlurHash(hash);
    } catch (error) {
      console.error("Error fetching BlurHash:", error);
      alert("Failed to fetch BlurHash. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleImageLoaded = (url: string) => {
    setImageLoaded((prevState) => ({ ...prevState, [url]: true }));
  };

  return (
    <div>
      <div>
        <h1>BlurHash Demo</h1>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)", // 3 equal columns
          gridGap: GAP, // Gap between grid items
          marginBottom: 40,
        }}
      >
        {/* Input Section */}
        <div>
          <h2>URL</h2>
          <input
            type="text"
            value={imageURL}
            onChange={handleURLChange}
            placeholder="Enter image URL"
            style={{ width: "250px" }}
          />
          <button onClick={generateBlurHash} disabled={isGenerating}>
            {isGenerating ? "Generating" : "Generate"}
          </button>
        </div>

        {/* BlurHash String Section */}
        <div>
          {blurHash && (
            <>
              <h2>BlurHash String</h2>
              <p>{blurHash}</p>
            </>
          )}
        </div>

        {/* BlurHash Preview Section */}
        <div>
          {blurHash && (
            <>
              <h2>BlurHash Preview</h2>
              <div
                style={{
                  position: "relative",
                  height: "300px",
                  borderRadius: "6px",
                  overflow: "hidden",
                }}
              >
                <Blurhash
                  hash={blurHash}
                  width={400}
                  height={300}
                  resolutionX={32}
                  resolutionY={32}
                  punch={1}
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    transition: "opacity 0.5s ease-out",
                  }}
                />
              </div>
            </>
          )}
        </div>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)", // 3 equal columns
          gridGap: GAP, // Gap between grid items
        }}
      >
        {blurHashes.map(({ url, hash }) => (
          <div
            key={url}
            style={{
              position: "relative",
              height: "300px",
              borderRadius: "6px",
              overflow: "hidden",
            }}
          >
            <Blurhash
              hash={hash}
              width={400}
              height={300}
              resolutionX={32}
              resolutionY={32}
              punch={1}
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                transition: "opacity 0.5s ease-out",
                opacity: imageLoaded[url] ? 0 : 1,
              }}
            />
            <img
              src={url}
              alt="Loaded content"
              onLoad={() => handleImageLoaded(url)}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "opacity 0.5s ease-in",
                opacity: imageLoaded[url] ? 1 : 0,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
