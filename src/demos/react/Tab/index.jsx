import React from 'react';
import Title from './title.jsx';
import Content from './content.jsx';
import CustomTextInput from './customTextInput.jsx';
import './style.scss';
export default class Tab extends React.Component{
    constructor(props){
        super(props);
        this.state={
            currentIndex: 0,
            titles: [
                {id:1, text:'Round trip'},
                {id:2, text:'One-way'}
            ],
            contents:[
                {id:1, text: 'Hello, I am num1'},
                {id:2, text: 'Yeah, I am num2'}
            ]
        }
    }
    toggleTitle=(index)=>{
        this.setState({
            currentIndex: index
        });
        console.log(this.inputElement.id)
    }
    render(){
        const titles = this.state.titles;
        const contents = this.state.contents;
        const currentIndex = this.state.currentIndex;
        return(
            <div>
                {
                    titles.map((title, index)=>
                        <Title inputRef={el => this.inputElement = el} key={title.id} index={index} currentIndex={currentIndex} title={title} toggleTitle={this.toggleTitle}/>
                    )
                }
                {
                    
                    contents.map((content, index)=>
                        <Content key={content.id} index={index} currentIndex={currentIndex} content={content} />
                    )
                }
                <CustomTextInput
                    inputRef={el => this.inputElement = el} />
            </div>
        )
    }
}