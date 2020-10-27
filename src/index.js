import React from 'react'
import ReactDOM from 'react-dom'
const data = {
    post: {
        id: 123,
        content:
            "What we hope ever to do with ease, we must first learn to do with diligence. — Samuel Johnson",
        user: "Mark Thomas"
    },
    comments: [
        {
            id: 0,
            user: "David",
            content: "such. win."
        },
        {
            id: 1,
            user: "Haley",
            content: "Love it."
        },
        {
            id: 2,
            user: "Peter",
            content: "Who was Samuel Johnson?"
        },
        {
            id: 3,
            user: "Mitchell",
            content: "@Peter get off Letters and do your homework"
        },
        {
            id: 4,
            user: "Peter",
            content: "@mitchell ok :P"
        }
    ]
}
class ShowComment extends React.Component {
    render () {
        return (
            <div>
                <span>姓名：{this.props.user}</span>
                <span>---</span>
                <span>评论内容：{this.props.content}</span>
            </div>
        )
    }
}
class CreatComment extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: '',
            content: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleCommentChange = this.handleCommentChange.bind(this)
        this.handleUserChange = this.handleUserChange.bind(this)
    }
    handleSubmit (e) {
        e.preventDefault()
        this.props.handleSubmit({ user: this.state.user.trim(), content: this.state.content.trim() })
        this.setState(() => ({ user: '', content: '' }))
    }
    handleCommentChange (e) {
        this.setState({ content: e.target.value })
    }
    handleUserChange (e) {
        this.setState({ user: e.target.value })
    }
    render () {
        return (
            <div>
                <input onChange={this.handleUserChange} type="text" placeholder="Name?" />
                <input onChange={this.handleCommentChange} type="text" placeholder="What to say?" />
                <input onClick={this.handleSubmit} type="submit" value="submit" />
            </div>
        )
    }
}

class Board extends React.Component {
    constructor(props) {
        super(props)
        this.state = { comments: this.props.comments }
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleSubmit (comment) {
        const comments = this.state.comments
        comment.id = Date.now()
        const newCom = comments.concat([comment])
        this.setState({ comments: newCom })
    }
    render () {
        return (
            <div>
                { this.state.comments.map((comment) => {
                    return <ShowComment key={comment.id} user={comment.user} content={comment.content}></ShowComment>
                }
                )}
                <CreatComment handleSubmit={this.handleSubmit} />
            </div>
        )
    }
}

ReactDOM.render(<Board comments={data.comments} />, document.getElementById('root'))