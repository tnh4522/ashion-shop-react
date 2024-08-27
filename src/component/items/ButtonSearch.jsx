import React from 'react';
import $ from 'jquery';

class ButtonSearch extends React.Component {
    handleClick = () => {
        $('.search-switch').on('click', function () {
            $('.search-model').fadeIn(400);
        });
    }

    render() {
        return (
            <span className="icon_search search-switch" onClick={this.handleClick}></span>
        )
    }
}

export default ButtonSearch;