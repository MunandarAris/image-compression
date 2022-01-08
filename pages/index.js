import React, { useState } from "react";

// import rect bootstrap component
import { Button, Card, Container, Spinner } from "react-bootstrap";

// import next js
import Head from "next/head";
import Image from "next/image";

// import module css
import homeModule from "../styles/Home.module.css";

// used plugins
import imageCompression from "browser-image-compression";

export default function HomePage() {
  // initial state
  const [priview, setPriview] = useState("");
  const [loading, setLoading] = useState(false);
  const [size, setSize] = useState(0);
  const [oldSize, setOldSize] = useState(0);
  const [originalName, setOriginalName] = useState("image");
  // setting before used imageCompression
  const options = {
    maxSizeMB: 10,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  };
  // handle if change image
  const handleChangeImage = async (e) => {
    if (e.target.files[0] !== undefined) {
      setLoading(true);
      // save image file
      const imageFile = e.target.files[0];

      // get old size
      setOldSize(parseInt(imageFile.size / 1000 / 1000, 10));

      // get original name
      setOriginalName(imageFile.name);

      // processing compression
      const compressedFile = await imageCompression(imageFile, options);

      // make e blob
      const blob = URL.createObjectURL(compressedFile);

      // const new size
      const newSize = parseInt(compressedFile.size / 1000, 10);

      // save data to state
      setPriview(blob);
      setSize(newSize);
      setLoading(false);
    }
  };

  // open input file
  const openInputFile = () => {
    document.getElementById("upload-image").click();
  };

  // delete image
  const handleDeleteImage = () => {
    setPriview("");
  };
  return (
    <>
      <Head>
        <title>Image Compressor</title>
        <link rel="icon" href="./icon.svg" />
        <link
          href="https://unpkg.com/boxicons@2.1.1/css/boxicons.min.css"
          rel="stylesheet"
        ></link>
      </Head>

      <Container>
        <Card className={`my-5 ${homeModule.card}`}>
          <div className="m-auto my-3">
            <Button className="btn btn-primary mx-2" onClick={openInputFile}>
              <i className="bx bxs-file-image"></i> UNGGAH FILE
            </Button>
            <Button className="btn btn-danger mx-2" onClick={handleDeleteImage}>
              <i className="bx bx-trash"></i> HAPUS
            </Button>
            <input
              id="upload-image"
              type="file"
              accept="image/*"
              className={`${homeModule.input}`}
              onChange={handleChangeImage}
            />
          </div>

          <div className={homeModule.cardContent}>
            {loading ? (
              <div className="text-center mt-5">
                <Spinner animation="border" variant="secondary" />
              </div>
            ) : priview == "" ? (
              <h3 className="text-center text-secondary mt-5">
                Unggah File Dulu
              </h3>
            ) : (
              <div className={`${homeModule.imagePriview} mt-3`}>
                <Image
                  src={priview}
                  alt="Image Priview"
                  width={200}
                  height={200}
                  objectFit="cover"
                  className={homeModule.priview}
                />
                <h5 className={homeModule.sizeCompression}>
                  {oldSize} MB <i className="bx bx-right-arrow-alt"></i> {size}{" "}
                  KB
                </h5>
              </div>
            )}
          </div>

          <div className="m-auto my-3">
            <a
              href={priview}
              download={`${originalName}`}
              className="btn btn-secondary mx-2"
            >
              <i className="bx bx-cloud-download"></i> DOWNLOAD
            </a>
          </div>
        </Card>
      </Container>
    </>
  );
}
