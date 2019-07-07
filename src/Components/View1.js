import React, { Component } from "react";
// import { Document, Page } from "react-pdf/src/entry.webpack";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${
  pdfjs.version
}/pdf.worker.js`;

class View1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pages: 0,
      file_base64:
        "",
      
    };
  }
componentDidMount(){
    this.getFileRaw();
}

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ pages: numPages });
  };
  getFileRaw = () => {
    var url = "https://swarm-gateways.net/bzz:/"+this.props.src+"/";
   

    fetch(url)
      .then(response => response.text())
      .then(text => {
        this.setState({ file_base64: text });
        console.log(text);
      })
      .catch(err => console.log(err));
  };
  onPageRenderSuccess = page => console.log("Rendered a page", page);
  options = {
    cMapUrl: "cmaps/",
    cMapPacked: true
  };
  render() {
    const { pages } = this.state;
    return (
      <div>
        {/* {<button onClick={this.getFileRaw}>Load</button>} */}
        <Document
          file={this.state.file_base64}
          onLoadSuccess={this.onDocumentLoadSuccess}
          options
        >
          {/* <Page
            renderMode={"canvas"}
            onRenderSuccess={this.onPageRenderSuccess}
            pageNumber={4}
          /> */}
          {Array.from(new Array(pages), (el, index) => (
            <Page
              renderMode={"canvas"}
              pageHeight={"500px"}
              pageWidth={"700px"}
              key={`page_${index + 1}`}
              pageNumber={index + 1}
              inputRef={
                pages === index + 1 ? ref => ref && ref.scrollIntoView() : null
              }
            />
          ))}
        </Document>
      </div>
    );
  }
}

export default View1;