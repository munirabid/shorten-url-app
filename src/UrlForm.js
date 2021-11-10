import React from 'react';

class URLFormComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            url: "",
            shortUrl : ""
          }

      }

      handleInputChanged(event) {
        this.setState({
            url: event.target.value
        });
      }

       handleButtonClicked = async(e) => {
        e.preventDefault();
        
        var url = this.state.url;

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ longUrl: url  })
        };
        const response = await fetch('https://abid-shorten-url-api.herokuapp.com/api/url/shorten', requestOptions);
        const data = await response.json();

        this.setState({shortUrl : data.shortUrl });
      }

    render() { 
        return (
            
            <div className="card">
            {/* <div className="card-header">
              Subscribe
            </div> */}
              <div className="card-body">
                <form id="userForm" className="form-inline">
                    <div className="row w-100">

                        <div className="col-md-10">
                            <div className="form-group">
                                
                                <input type="url" onChange={this.handleInputChanged.bind(this)} value={this.state.url} name="exampleInputURL" placeholder="Enter URL" className="form-control w-100" id="exampleInputURL" required  />
                            </div>
                        </div>
                        <div className="col-md-2">
                            <button onClick={this.handleButtonClicked.bind(this)} type="btn" className="btn btn-primary" id="submitForm">Submit</button>
                        </div>
                        
                    </div>
                </form>

                 <div className="row w-100 ml-1 mt-2">
                 <label >Short URL</label>
                     <a href={this.state.shortUrl}> {this.state.shortUrl}</a>
                 </div>

              </div>
          </div>   
          
        );
    }
}
export default URLFormComponent;
