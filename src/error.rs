#[derive(Debug)]
pub enum ClevelError {
    SIMPLE(String),
}

impl ClevelError {
    pub fn simple<T: Into<String>>(msg: T) -> ClevelError {
        ClevelError::SIMPLE(msg.into())
    }
}

impl std::fmt::Display for ClevelError {
    fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {
        match *self {
            ClevelError::SIMPLE(ref s) => write!(f, "{}", s),
        }
    }
}

impl std::error::Error for ClevelError {
    fn cause(&self) -> Option<&dyn std::error::Error> {
        match *self {
            ClevelError::SIMPLE(ref _s) => Some(self),
        }
    }
}

impl From<std::string::FromUtf8Error> for ClevelError {
    fn from(_: std::string::FromUtf8Error) -> ClevelError {
        ClevelError::SIMPLE("Unable to convert UTF-8 to string".to_string())
    }
}
