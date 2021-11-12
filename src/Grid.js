import React from "react";

class GridComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: this.props.isLoaded,
      items: this.props.items,
    };
  }

  render() {
    const { error, isLoaded, items } = this.props;

    if (error) {
      return <div>Error: {error.message}</div>;
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
            {items.map((item, index) => (
              <tr key={index + 1}>
                <td> {index + 1} </td>
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
