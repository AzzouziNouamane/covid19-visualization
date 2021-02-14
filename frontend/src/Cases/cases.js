import React, { Component } from 'react'

    const api_URL = 'http://localhost:3001/';

    class Cases extends Component {
        state = {
            cases: [],
            loading: true
          }

        async componentDidMount() {
          const response = await fetch(api_URL + 'cases');
          const data = await response.json();
          this.setState({cases: data, loading: false});
        }

        render() {
            return (
              <div>
                {this.state.loading | !this.state.cases ? 
                <div>''</div> :
                <div>
                  <p>Today's date: {this.state.cases.total.date}</p>
                  <p>Today new confirmed cases: {this.state.cases.total.today_new_confirmed}</p>
                  <p>Today new recovered cases: {this.state.cases.total.today_new_recovered}</p>
                  <p>Today new confirmed deaths: {this.state.cases.total.today_new_deaths}</p>
                
                </div>
                }

              </div>
            )
          }
    }

    export default Cases