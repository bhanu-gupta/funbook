import React from 'react';
import { closeModal } from '../actions/modal_actions';
import { connect } from 'react-redux';
import CreatePostContainer from './posts/create_post_form_container';

function Modal({ modal, closeModal }) {
    if (!modal) {
        return null;
    }
    let component;
    switch (modal) {
        case 'create-post':
            component = <CreatePostContainer />;
            break;
        default:
            return null;
    }
    return (
        <div className="modal-background" onClick={closeModal} >
            <div className="modal-child" onClick={modalChildClick}>
                {component}
            </div>
        </div>
    );
}

const modalChildClick = (e) => { 
    if (modal === 'create-post' && e.target.id !== 'close-btn') {
        e.stopPropagation();
    }
}

const mapStateToProps = state => {
    return {
        modal: state.ui.modal
    };
};

const mapDispatchToProps = dispatch => {
    return {
        closeModal: () => dispatch(closeModal())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);