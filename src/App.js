import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './App.css'

const initialApisStates = {
  initial: 'Initial',
  inProgress: 'InProgress',
  success: 'Succes',
}

class App extends Component {
  state = {travelLists: [], apiStatus: initialApisStates.initial}

  componentDidMount() {
    this.getList()
  }

  getList = async () => {
    this.setState({apiStatus: initialApisStates.inProgress})
    const options = {method: 'GET'}
    const response = await fetch('https://apis.ccbp.in/tg/packages', options)
    const data = await response.json()
    console.log(data.packages)
    if (response.ok) {
      //   const updatedData=data.packages.map((item)=>{
      //       id: item.id,name: item.name,description: item.description,imageUrl: item.image_url
      //   })
      this.setState({
        travelLists: data.packages,
        apiStatus: initialApisStates.success,
      })
    }
  }

  renderLoaderView = () => (
    <div data-testid="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  render() {
    const {apiStatus, travelLists} = this.state

    return (
      <div className="bg-container">
        <h1 className="heading">Travel Guide</h1>
        {apiStatus === initialApisStates.inProgress ? (
          this.renderLoaderView()
        ) : (
          <ul className="lists-container">
            {travelLists.map(item => (
              <li className="list" key={item.id}>
                <img src={item.image_url} alt={item.name} className="image" />
                <h1 className="card-heading">{item.name}</h1>
                <p className="text">{item.description}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    )
  }
}

export default App
