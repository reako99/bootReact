package com.bjc.board_back.common;

public interface ResponseMessage {

    // Http Status 200
    String SUCCESS = "Success.";

    // Http Status 400
    String VALIDATION_FAILED = "Validation failed.";
    String DUPLICATE_EMAIL = "Duplicate email.";
    String DUPLICATE_TEL_NUMBER = "Duplicate tel number.";
    String DUPLICATE_NICKNAME = "Duplicate nickname.";
    String NOT_EXISTED_USER = "This user does not exist.";
    String NOT_EXISTED_BOARD = "This board does not exist.";
    
    // Http Status 401
    String SIGN_IN_FAIL = "Login information mismatch.";
    String AUTHORIZATION_FAIL = "Authorization Failed.";

    // Http Status 403
    String NO_PERMISSION = "Do not have permission.";

    // Http Status 500
    String DATABASE_ERROR = "Database error.";
    
    
} 