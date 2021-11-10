import React from 'react';

class GridComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          items: []
        };
      }


      componentDidMount() { 
        fetch("https://abid-shorten-url-api.herokuapp.com/api/url/list")
        .then(res => res.json())
        .then(
          (result) => {
              console.log(result);
            this.setState({
              isLoaded: true,
              items: result
            });
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        )

      }

      render() {
        const { error, isLoaded, items } = this.state;
        if (error) {
          return ( 
          <div>Error: {error.message}
          </div>
          );
        } else if (!isLoaded) {
          return <div>Loading...</div>;
        } else {
          return (
        
            <table className="table">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Short URL</th>
                    <th>Visited Count</th>
                    <th>Attempts To Shorten</th>
                </tr>
                </thead>
                <tbody>

                {items.map( (item, index ) => (
              
                <tr  key={index+1}>
                    <td> {index+1} </td>
                    <td>
                        <a href={item.shortUrl}>{item.shortUrl}</a>
                    </td>
                    <td>{item.visitCount}</td> 
                    <td>{item.attemptsToShorten ? item.attemptsToShorten : ""}</td> 
                </tr>

                ))}

                
                </tbody>
            </table>
          );
        }
      }
}

export default GridComponent;