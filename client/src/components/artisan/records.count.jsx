import PropTypes from "prop-types";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import '../artisan/neo.toggle.css'

const RecordsCount = ({ recordTitle='Records', recordsCount }) => {
    return(
        <>
            <Row>
                <Col>
                      <p className="record-count-title">{recordTitle} Found <a className="record-count-value">{recordsCount}</a></p>
                </Col>
            </Row>
        </>
    )
}

RecordsCount.propTypes = {
    recordTitle: PropTypes.string,
    recordsCount: PropTypes.number.isRequired
}

export default RecordsCount;