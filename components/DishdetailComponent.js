// import React, { Component } from 'react';
// import { DISHES } from '../shared/dishes';
// import { COMMENTS } from '../shared/comments';
// import { Text, View, ScrollView, FlatList, Modal, StyleSheet, Button,  Picker, Switch} from 'react-native';
// import { Card, Icon,Rating, Input } from 'react-native-elements';
// import { connect } from 'react-redux';
// import { baseUrl } from '../shared/baseUrl';
// import { postFavorite, postComment } from '../redux/ActionCreators';

// const mapStateToProps = state => {
//     return {
//       dishes: state.dishes,
//       comments: state.comments,
//       favorites: state.favorites
//     }
//  }

// const mapDispatchToProps = dispatch => ({
//     postFavorite: (dishId) => dispatch(postFavorite(dishId)),
//     postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment))
// })

// function RenderComments(props) {
//     const comments = props.comments;

//     const renderCommentItem = ({item, index}) => { 
//         return (
//             <View key={index} style={{margin: 10}}>
//                 <Text style={{fontSize: 14}}>{item.comment}</Text>
//                 <View style={{
//                     flexDirection: "row",
//                     justifyContent: "flex-start",
//                     alignItems: "center"}}>
//                         <Rating
//                             imageSize={14}
//                             readonly
//                             startingValue={item.rating}
//                             />
//                 </View>
//                 <Text style={{fontSize: 12}}>{'-- ' + item.author + ', ' + 
//                 new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(item.date)))
//                 } </Text>
//             </View>
//         );
//     };
    
//     return (
//         <Card title='Comments' >
//         <FlatList 
//             data={comments}
//             renderItem={renderCommentItem}
//             keyExtractor={item => item.id.toString()}
//             />
//         </Card>
//     );
// }

// function RenderDish(props) {

//     const dish = props.dish;
    
//         if (dish != null) {
//             return(
//                 <Card
//                 featuredTitle={dish.name}
//                 image={{uri: baseUrl + dish.image}}>
//                     <Text style={{margin: 10}}>
//                         {dish.description}
//                     </Text>
//                     <View style={{
//                         flexDirection: "row",
//                         justifyContent: "center",
//                         alignItems: "center"}}>
//                         <Icon
//                             raised
//                             reverse
//                             name={ props.favorite ? 'heart' : 'heart-o'}
//                             type='font-awesome'
//                             color='#f50'
//                             onPress={() => props.favorite ? console.log('Already favorite') : props.onPress()}
//                             />
//                         <Icon
//                             raised
//                             reverse
//                             name='pencil'
//                             type='font-awesome'
//                             color='#512DA8'
//                             onPress={() => props.toggleModal()}
//                             />
//                     </View>
//                 </Card>
//             );
//         }
//         else {
//             return(<View></View>);
//         }
// }

// class Dishdetail extends Component {

//     constructor(props) {
//         super(props);
//         this.state = {
//             dishes: DISHES,
//             comments: COMMENTS,
//             favorites: [],
//             showModal: false,
//             author: '',
//             comment: '',
//             rating: 1,
//         };
//         this.toggleModal = this.toggleModal.bind(this);
//     }

//     toggleModal() {
//         this.setState({showModal: !this.state.showModal});
//     }

//     resetForm() {
//         this.setState({
//             showModal: false,
//             author: '',
//             comment: '',
//             rating: 1,
//         });
//     }

//     markFavorite(dishId) {
//         this.props.postFavorite(dishId);
//     }

//     handleComment(dishId, rating, author, comment) {
//         this.props.postComment(dishId, rating, author, comment);
//         this.toggleModal();
//         this.resetForm();
//     }

//     static navigationOptions = {
//         title: 'Dish Details'
//     };

//     render() {
//         const dishId = this.props.navigation.getParam('dishId','');
//         return(
//             <ScrollView>
//                 <RenderDish dish={this.props.dishes.dishes[+dishId]}
//                     favorite={this.props.favorites.some(el => el === dishId)}
//                     onPress={() => this.markFavorite(dishId)}
//                     toggleModal={() => this.toggleModal()}
//                     />
//                 <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} />
//                 <Modal animationType={"slide"}
//                     transparent={false}
//                     visible={this.state.showModal}
//                     onDismiss={() => this.toggleModal() }
//                     onRequestClose={() => this.toggleModal() }>
//                     <View style={styles.modal}>
//                         <View style={styles.formRow}>
//                             <Rating showRating startingValue={this.state.rating} imageSize={40} 
//                                 style={{ paddingVertical: 10 }}
//                                 onFinishRating={(value) => this.setState({rating: value})}
//                                 />
//                         </View>

//                         <View style={styles.formRow}>
//                             <Input
//                                 placeholder='Author'
//                                 leftIcon={{ type: 'font-awesome', name: 'user-o' }}
//                                 onChangeText={(value) => this.setState({author: value})}
//                                 />
//                         </View>

//                         <View style={styles.formRow}>
//                             <Input
//                                 placeholder='Comment'
//                                 leftIcon={{ type: 'font-awesome', name: 'comment-o' }}
//                                 onChangeText={(value) => this.setState({comment: value})}
//                                 />
//                         </View>

//                         <View style={styles.formRow}>
//                         <Button 
//                             raised
//                             onPress = {() =>{this.handleComment(dishId, this.state.rating, this.state.author, this.state.comment);}}
//                             color="#512DA8"
//                             title="Submit" 
//                             style={{marginTop: 10}}
//                             accessibilityLabel="Add new comment"
//                             />
//                         </View>

//                         <View style={styles.formRow}>
//                         <Button 
//                             raised
//                             onPress = {() =>{this.toggleModal(); this.resetForm();}}
//                             color="#999"
//                             title="Cancel" 
//                             style={{marginTop: 10}}
//                             accessibilityLabel="Cancel the modal"
//                             />
//                         </View>
//                     </View>
//                 </Modal>
//             </ScrollView>
//         );
//     }
// }

// const styles = StyleSheet.create({
//     formRow: {
//         margin: 20
//       },
//     modal: {
//         justifyContent: 'center',
//         margin: 20
//      },
//      modalTitle: {
//          fontSize: 24,
//          fontWeight: 'bold',
//          backgroundColor: '#512DA8',
//          textAlign: 'center',
//          color: 'white',
//          marginBottom: 20
//      },
//      modalText: {
//          fontSize: 18,
//          margin: 10
//      }
// });

// export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);;


import React ,{ Component} from "react";
import {Text,
    View,
    ScrollView,
    FlatList,
    Modal,
    StyleSheet,
    Button}  from 'react-native';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
// import AddCommentForm from '../forms/AddComments';
import { postFavorite, postComment } from "../redux/ActionCreators";
import { Card, Icon, Input ,Rating } from "react-native-elements";

const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      favorites: state.favorites
    }
  }

  const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    postComment: (dishId, rating, author, comment) =>
    dispatch(postComment(dishId, rating, author, comment))
})



function RenderDish(props){
    const dish = props.dish;

    if(dish){
        return(
            <Card
                featuredTitle={dish.name}
                image={{uri: baseUrl + dish.image}}>
                    <Text style={{margin: 10}}>
                        {dish.description}
                    </Text>
                    <View style={{display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
                        <Icon
                            raised
                            reverse
                            name={ props.favorite ? 'heart' : 'heart-o'}
                            type='font-awesome'
                            color='#f50'
                            onPress={() => props.favorite ? console.log('Already favorite') : props.onPress()}
                        />
                        <Icon
                            raised
                            reverse
                            name='pencil'
                            type='font-awesome'
                            color='#0000ff'
                            onPress={() => props.onPressAddComment()}
                        />  
                    </View> 
            </Card>
        );
    }
    else{
        return(<View></View>)
    }
}

function RenderComments(props){
    const comments = props.comments;

    const renderCommentItem =({item,index}) => {
        return(
            <View key ={index} style = {{margin:10}}>
                 <Rating
                    imageSize={15}
                    readonly
                    startingValue={item.rating}
                    style={{ alignItems: "flex-start" }}
                    />
                <Text style ={{fontSize:14}}>{item.comment}</Text>
                <Text style ={{fontSize:12}}>{item.ratting } Stars</Text>
                <Text style ={{fontSize:12}}>{'--'+ item.author+','+item.date}</Text>
            </View>
        );
    }
    return(
        <Card title='Comments' >
        <FlatList 
            data={comments}
            renderItem={renderCommentItem}
            keyExtractor={item => item.id.toString()}
            />
        </Card>
    );
}
class Dishdetail extends Component {

    constructor(props){
        console.log("in dish detail")
        super(props);

        this.state = {
            showModal:false,
            favorites : [],
            author: "",
            comment: "",
            rating: null
        }
    }
    
    openCommentForm = () => {
        this.setState({showModal: true})
    }

    toggleModal = () => {
    this.setState({showModal: !this.state.showModal})
    }
    markFavorite(dishId) {
        this.props.postFavorite(dishId);
    }

    static navigationOptions ={
        title:'Dish Details'
    }

    ratingCompleted = rating => {
        this.setState({ rating });
      };
    
      handleAuthorInput = author => {
        this.setState({ author });
      };
    
      handleCommentInput = comment => {
        this.setState({ comment });
      };
    
      resetForm() {
        this.setState({
            author: "",
            comment: "",
            rating: null
        });
      }
    
      handleComment() {
        const { rating, author, comment } = this.state;
        const dishId = this.props.navigation.getParam("dishId", "");
        
        console.log("handle COmmeny " , dishId , rating , author , comment)
        this.toggleModal();
        this.props.postComment(dishId, rating, author, comment);
        console.log("after hanle comment")
      }

    render(){
        const dishId = this.props.navigation.getParam('dishId','');
        return(
            <ScrollView>
                <RenderDish dish={this.props.dishes.dishes[+dishId]} 
                favorite={this.props.favorites.some(el => el === dishId)}
                onPress={() => this.markFavorite(dishId)}
                onPressAddComment={this.toggleModal}
                />
                <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId ===dishId)}
                    />
                {/* <AddCommentForm
                    toggleModal={() => this.toggleModal()}
                    showModal={this.state.showModal}
                    dishId={dishId}
                /> */}
                <Modal
                    animationType={"slide"}
                    transparent={false}
                    visible={this.state.showModal}
                    onDismiss={() => this.toggleModal()}
                    onRequestClose={() => this.toggleModal()}
                    >
                    <View style={styles.modal}>
                        <Rating
                            imageSize={30}
                            startingValue={0}
                            showRating
                            onFinishRating={this.ratingCompleted}
                            style={{ paddingVertical: 10 }}
                        />
                        <Input
                        placeholder='Author'
                        leftIcon={
                          <Icon
                            name='user-o'
                            type='font-awesome'
                            size={24}
                            color='black'
                          />
                        }
                        style={{paddingBottom: 30}}
                        

                            
                            onChangeText={this.handleAuthorInput}
                        
                        />
                        <Input
                            placeholder='Comment'
                            leftIcon={
                            <Icon
                                name='comment-o'
                                type='font-awesome'
                                size={24}
                                color='black'
                            />
                            }
                            onChangeText={this.handleCommentInput}
                            
                        />
                        <View style={{ margin: 10 }}>
                        <Button
                            onPress={() => {
                            this.handleComment();
                            this.resetForm();
                            }}
                            color="#512DA8"
                            title="Submit"
                        />
                        </View>
                        <View style={{ margin: 10 }}>
                        <Button
                            onPress={() => {
                            this.toggleModal();
                            this.resetForm();
                            }}
                            color="gray"
                            title="Cancel"
                        />
                        </View>
                    </View>
                    </Modal>
            </ScrollView>
        );
    }
    
}

const styles = StyleSheet.create({
    icons: {
      alignItems: "center",
      justifyContent: "center",
      flex: 1,
      flexDirection: "row"
    },
    formRow: {
      alignItems: "center",
      justifyContent: "center",
      flex: 1,
      flexDirection: "row",
      margin: 20
    },
    formLabel: {
      fontSize: 18,
      flex: 2
    },
    formItem: {
      flex: 1
    },
    modal: {
      justifyContent: "center",
      margin: 20
    },
    modalTitle: {
      fontSize: 24,
      fontWeight: "bold",
      backgroundColor: "#512DA8",
      textAlign: "center",
      color: "white",
      marginBottom: 20
    },
    modalText: {
      fontSize: 18,
      margin: 10
    }
  });
export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);