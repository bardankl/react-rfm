import React, {Component} from 'react';
import axios from 'axios';

class Test2 extends Component {
    get = () => {
      axios.post('/2', {test:'test'})
          .then(res=>{
              console.log(res)
          })
    };
    render() {
        return (
            <div>
                <button onClick={this.get}>click</button>
            </div>
        )
    }


}

export  default Test2;
