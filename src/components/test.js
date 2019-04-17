// import React, {Component} from 'react';
//
//
// class Test extends Component {
// constructor () {
//     super();
//     this.state ={
//         file: null
//     }
//
// }
//
//     handler = (e) => {
//         this.setState({file:e.target.files});
//         console.log(this.state.file);
//         console.log('111')
//     };
//     render() {
//         return (
//             <div>
//                 <input onLoad={this.handler} type='file'/>
//                 {/*<button onClick={this.handler}>click me</button>*/}
//             </div>
//         )
//     }
//
// }
//
// export default Test;
import React, {Component} from 'react';
import XLSX from 'xlsx';

class SheetJSApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [], /* Array of Arrays e.g. [["a","b"],[1,2]] */
        };
        this.handleFile = this.handleFile.bind(this);
    };
    handleFile(file/*:File*/) {
        /* Boilerplate to set up FileReader */
        const reader = new FileReader();
        const rABS = !!reader.readAsBinaryString;
        reader.onload = (e) => {
            /* Parse data */
            const bstr = e.target.result;
            const wb = XLSX.read(bstr, {type:rABS ? 'binary' : 'array'});
            /* Get first worksheet */
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            /* Convert array of arrays */
            const data = XLSX.utils.sheet_to_json(ws, {header:1});
            /* Update state */
            this.setState({ data: data});
            console.log(this.state.data)
        };
        if(rABS) reader.readAsBinaryString(file); else reader.readAsArrayBuffer(file);
    };
    render() { return (
        <DragDropFile handleFile={this.handleFile}>
            <div>
                <div>
                <DataInput handleFile={this.handleFile} />
            </div>
            </div>
        </DragDropFile>
    ); };
};

export default SheetJSApp;

class DragDropFile extends React.Component {
    constructor(props) {
        super(props);
        this.onDrop = this.onDrop.bind(this);
    };
    suppress(evt) { evt.stopPropagation(); evt.preventDefault(); };
    onDrop(evt) { evt.stopPropagation(); evt.preventDefault();
        const files = evt.dataTransfer.files;
        if(files && files[0]) this.props.handleFile(files[0]);
    };
    render() { return (
        <div onDrop={this.onDrop} onDragEnter={this.suppress} onDragOver={this.suppress}>
            {this.props.children}
        </div>
    ); };
};

class DataInput extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    };
    handleChange(e) {
        const files = e.target.files;
        if(files && files[0]) this.props.handleFile(files[0]);
    };
    render() { return (
        <form>
            <div>
                <label htmlFor="file">Spreadsheet</label>
                <input type="file" id="file" accept={SheetJSFT} onChange={this.handleChange} />
            </div>
        </form>
    ); };
}

/* list of supported file types */
const SheetJSFT = [
    "xlsx", "xlsb", "xlsm", "xls", "xml", "csv", "txt", "ods", "fods", "uos", "sylk", "dif", "dbf", "prn", "qpw", "123", "wb*", "wq*", "html", "htm"
].map(function(x) { return "." + x; }).join(",");

/* generate an array of column objects */
const make_cols = refstr => {
    let o = [], C = XLSX.utils.decode_range(refstr).e.c + 1;
    for(var i = 0; i < C; ++i) o[i] = {name:XLSX.utils.encode_col(i), key:i}
    return o;
};
