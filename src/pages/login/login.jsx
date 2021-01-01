import  React,{Component} from "react";

import { Form, Icon, Input, Button,message} from 'antd';

import logo from "./imgs/logo.png";

import  "./css/login.less";

const {Item} = Form

 class Login extends Component{

  handleSubmit = (event)=>{
    event.preventDefault();//阻止默认事件--禁止form表单提交---通过ajax发送
    this.props.form.validateFields((err, values) => {
      console.log(err,values);
      if(!err){
        alert('向服务器发送登录请求')
      }else{
        message.error('表单输入有误，请检查！')
      }
    });
  }




  pwdValidator=(rule, value, callback)=>{

    if(value.length<4){

       callback('密码必须大于等于4位')
    }else if(!value){

     
      callback('密码必须输入')
    }else if(value.length>12){
    
       callback('密码必须小于等于12位')
    }else if(!/^\w+$/.test(value)){
    
       callback('密码必须是英文、数字或下划线组成')
    }else{

      callback()
    }
    

  }

  




  render(){

    
    const {getFieldDecorator} = this.props.form

    return (<div className='login'>
      <header>
        <img src={logo} alt="logo"/>
        <h1>商品管理系统</h1>
      </header>
      <section>
        <h1>用户登录</h1>
        <Form onSubmit={this.handleSubmit} className="login-form">
        <Item>
        {getFieldDecorator('username', {
            rules: [{ required: true, message: '用户名必须输入' },         
                    {max:12,message:'用户名必须小于等于12位'},
                    {min:4,message:'用户名必须大于等于4位'},
                    {pattern:/^\w+$/,message:'用户名必须是英文、数字或下划线组成'}
          ],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="用户名"
            />,
          )}         
        </Item>
        <Item>
        {getFieldDecorator('password', {
            rules: [{validator:this.pwdValidator}]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="密码"
            />,
          )} 
        </Item>
        <Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
            登录
          </Button>
        </Item>
      </Form>
      </section>
    </div>)

  }

}


export default Form.create()(Login)

