//
//  Hydepark Modals
//
//  Created by Daniel Ryan on 2011-11-12.
//  Copyright 2011 Obama for America. All rights reserved.
//  Updated August 8, 2012

/*
 *  Usage
 *  ofa.modal(params)
 *
 *  Parameters: - all are optional -
 *  @header             (string or html)
 *  @content            (string or html)
 *  @className          (string)            defaults to "modal module"
 *  @overlay            (boolean)           defaults to true; set to false to hide the overlay
 *  @overlayCloses      (boolean)           defaults to true; if set to false, clicking the overlay will not close the modal
 *  @showButtons        (boolean)           defaults to true; set to false to turn off the button bar
 *  @closeButton        (boolean)           defaults to true; set to false to turn off the close button
 *  @cancelButton       (boolean)           defaults to true; set to false to turn off the cancel button
 *  @cancelButtonText   (string)            defaults to "Cancel"
 *  @cancelButtonLink   (string)            defaults to "#cancel"
 *  @confirmButton      (boolean)           defaults to true; set to false to turn off the confirm button
 *  @confirmButtonText  (string)            defaults to "OK"
 *  @confirmButtonLink  (string)            defaults to "#confirm"
 *  @customButtons      (array)             defaults to an empty array; accepts either strings or jQuery objects to be placed in the button bar (standard cancel and confirm will not be used)
 *  @position           (string)            defaults to "centered"; accepts either "centered" (modal is automatically moved to the center when shown) or "top" (modal sticks to the top of the viewport)
 *  @contentLinksClose  (boolean)           defaults to true; set to false to keep modal active when links inside the content area are clicked
 *  @interactionHandler (function)          defaults to basically a no-op function; set to a custom function that receives a "state" (string) parameter when any link in the modal is clicked
 *
 *  interactionHandler Return Values
 *  "close-clicked"                         returned when the close button is clicked and the modal is closed
 *  "overlay-clicked"                       returned when the overlay is clicked and the modal is closed
 *  "cancel-button-clicked"                 returned when the cancel button is clicked and the modal is closed
 *  "confirm-button-clicked"                returned when the confirm button is clicked and the modal is closed
 *  "cancel-button-clicked"                 returned when the cancel button is clicked and the modal is closed
 *  "content-link-clicked"                  returned when any link in the content area is clicked; modal may still remain open depending on the @contentLinksClose value
 *
 *  Methods:
 *  recenter()                              recenters the modal based on the current content
 *  emptyContent()                          removes all children of the "entry-content" portion of the model
 *  updateContent(htmlString)               replaces the contents of "entry-content" with the supplied html
 */

if(!window.ofa) {
    window.ofa  =   {};
}

var ofa =   window.ofa;

(function($, win, doc) {
    "use strict";
    
    var
    template    =   '<div class="{{ className }} {{ position }}" id="{{ id }}">\
                        {{#closeButton}}\
                            <a href="#close" class="close"><b>Close</b> &times;</a>\
                        {{/closeButton}}\
                        {{#header}}\
                            <header class="module-header">{{{ header }}}</header>\
                        {{/header}}\
                        {{#content}}\
                            <div class="entry-content">\
                                {{{ content }}}\
                            </div>\
                        {{/content}}\
                        {{#showButtons}}\
                            <footer>\
                                {{^hasCustomButtons}}\
                                    {{#cancelButton}}\
                                        <a href="{{ cancelButtonLink }}" title="{{ cancelButtonText }}" class="button cancel">{{ cancelButtonText }}</a>\
                                    {{/cancelButton}}\
                                    {{#confirmButton}}\
                                        <a href="{{ confirmButtonLink }}" title="{{ confirmButtonText }}" class="button confirm">{{ confirmButtonText }}</a>\
                                    {{/confirmButton}}\
                                {{/hasCustomButtons}}\
                            </footer>\
                        {{/showButtons}}\
                    </div>',
    overlay     =   $('<div id="overlay" />'),
    body        =   $('body'),
    defaults    =   {
        "header":               null,
        "content":              null,
        "className":            "modal module",
        "overlay":              true,
        "overlayCloses":        true,
        "showButtons":          true,
        "closeButton":          true,
        "cancelButton":         true,
        "cancelButtonText":     "Cancel",
        "cancelButtonLink":     "#cancel",
        "confirmButton":        true,
        "confirmButtonText":    "OK",
        "confirmButtonLink":    "#confirm",
        "customButtons":        [],
        "hasCutomButtons":      false,
        "position":             "centered", // valid values are "top" and "centered"
        "contentLinksClose":    true,
        "interactionHandler":   function(state) {
            return state;
        }
    };

    function Modal(opts) {
        var m               =   this; // needed to keep references scoped properly in methods
        
        // get a guid for specific functions
        this.id             =   "modal-" + (new Date()).valueOf();
        opts.id             =   this.id;

        // generate the markup
        this.markup         =   $(win.Mustache.to_html(template, opts));

        // link the modal markup to it's prototype so event listeners can trigger actions bound to this specific instance
        this.markup.find('.modal').data('object', this);
        
        // provide accessors to the content elements
        this.closeButton    =   this.markup.find('.close');
        this.header         =   this.markup.find('header');
        this.footer         =   this.markup.find('footer');
        this.content        =   this.markup.find('.entry-content');
        this.cancelButton   =   this.markup.find('.cancel');
        this.confirmButton  =   this.markup.find('.confirm');

        // set up the feedback handler
        this.interactionHandler =   ofa.is(opts.interactionHandler, "function") ? opts.interactionHandler : function() {};
        
        // determine if this modal should be automatically centered when shown
        this.centered       =   opts.position === "centered";
        
        // determine if this modal shows the overlay when shown
        this.overlay        =   opts.overlay;

        // add the custom buttons if present
        if(opts.hasCustomButtons) {
            var
            footer  =   this.markup.find('footer');
            $.each(opts.customButtons, function(index, button) {
                footer.append(button);
            });
        }

        // set up the event handlers
        m.markup.delegate('.close', 'click', function(c) {
            c.preventDefault();
            m.close("close-clicked");
        });
        
        if(opts.overlayCloses) {
            body.delegate('#overlay', 'click', function() {
                if(m.markup.is('.active')) {
                    m.close("overlay-clicked");
                }
            });
        }

        m.markup.delegate('.cancel[href="#cancel"]', 'click', function(c) {
            c.preventDefault();
            m.close("cancel-button-clicked");
        });

        m.markup.delegate('.confirm[href="#confirm"]', 'click', function(c) {
            c.preventDefault();
            m.close("confirm-button-clicked");
        });
        
        if(opts.contentLinksClose) {
            m.markup.delegate(".entry-content a", "click", function() {
                m.close("content-link-clicked");
            });
        } else {
            m.markup.delegate(".entry-content a", "click", function() {
                m.interactionHandler("content-link-clicked");
            });
        }
        
        this.insert         =   function() {
            body.append(m.markup);
            return m;
        };
        
        this.emptyContent   =   function() {
            m.content.empty();
            return m;
        };
        
        this.updateContent  =   function(newContent) {
            m.content.html(newContent);
            return m;
        };
        
        this.recenter       =   function() {
            var
            w           =   m.markup.outerWidth(),
            h           =   m.markup.outerHeight(),
            top         =   Math.floor(h / 2),
            left        =   Math.floor(w / 2);
            if(left < 0) {
                left    =   0;
            }
            if(!m.centered || top < 0) {
                top     =   0;
            }
            m.markup.css({
                "margin-top":   (0 - top) + "px",
                "margin-left":  (0 - left) + "px"
            });
            return m;
        };
        
        this.open           =   function() {
            m.markup.addClass('active');
            if(m.overlay) {
                overlay.addClass('active');
            }
            m.recenter();
            return m;
        };
        
        this.close          =   function(state) {
            m.markup.add(overlay).removeClass('active');
            m.interactionHandler(state);
            return m;
        };
    }

    function modal(opts) {
        for(var key in defaults) {
            if(typeof opts[key] === "undefined") {
                opts[key]   =   defaults[key];
            }
        }
        opts.hasCustomButtons   =   opts.customButtons.length;
        var
        modalObject =   new Modal(opts);
        modalObject.insert();
        return modalObject;
    }
    
    ofa.modal   =   modal; // add to the global namespace
    
    // add the overlay to the DOM
    body.append(overlay);
    
})(jQuery, window, document);
