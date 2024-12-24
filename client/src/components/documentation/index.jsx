import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import '../documentation/documentation.css'
import { useEffect } from 'react';

const Documentation = () => {
    useEffect(() => {
        window.addEventListener('DOMContentLoaded', () => {

            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    const id = entry.target.getAttribute('id');
                    if (entry.intersectionRatio > 0) {
                        document.querySelector(`nav li a[href="#${id}"]`).parentElement.classList.add('active');
                    } else {
                        document.querySelector(`nav li a[href="#${id}"]`).parentElement.classList.remove('active');
                    }
                });
            });
        
            // Track all sections that have an `id` applied
            document.querySelectorAll('section[id]').forEach((section) => {
                observer.observe(section);
            });
            
        });
      }, []);

    return(
        <>
        <Container fluid className='counsel-box'>

        <Row className='logo-box'>
            <Col size={8}>
            <p className='version-text'>Chímaira v1.0.0</p>
            </Col>
        </Row>
        <Row>
            <Col size={12}>
            <main>
            <div>
                <section className="side-section" id="introduction">
                    <h2 className="section-title">Introduction</h2>
                    <p className="section-text">…</p>
                </section>
                <section className="side-section" id="profile-permissions">
                    <h2 className="section-title">User Permissions</h2>
                    <p className="section-text">…</p>
                </section>
                <section className="side-section" id="dashboard">
                    <h2 className="section-title">Dashboard</h2>
                    <p className="section-text">…</p>
                </section>
                <section className="side-section" id="group">
                    <h2 className="section-title">Group</h2>
                    <p className="section-text">…</p>
                </section>
                <section className="side-section" id="locker">
                    <h2 className="section-title">Locker</h2>
                    <section className="side-section" id="locker--focus1">
                        <h3 className="section-title">Locker Focus 1</h3>
                        <p className="section-text">…</p>
                    </section>
                    <section className="side-section" id="locker--focus2">
                        <h3 className="section-title">Locker Focus 2</h3>
                        <p className="section-text">…</p>
                    </section>
                    <section className="side-section" id="locker--focus3">
                        <h3 className="section-title">Locker Focus 3</h3>
                        <p className="section-text">…</p>
                    </section>
                    <section className="side-section" id="locker--focus4">
                        <h3 className="section-title">Locker Focus 4</h3>
                        <p className="section-text">…</p>
                    </section>
                    <section className="side-section" id="locker--focus5">
                        <h3 className="section-title">Locker Focus 5</h3>
                        <p className="section-text">…</p>
                    </section>
                    <section className="side-section" id="locker--focus6">
                        <h3 className="section-title">Locker Focus 6</h3>
                        <p className="section-text">…</p>
                    </section>
                    <section className="side-section" id="locker--focus7">
                        <h3 className="section-title">Locker Focus 7</h3>
                        <p className="section-text">…</p>
                    </section>
                    <section className="side-section" id="locker--focus8">
                        <h3 className="section-title">Locker Focus 8</h3>
                        <p className="section-text">…</p>
                    </section>
                </section>
                <section className="side-section" id="locker-groups">
                    <h2 className="section-title">Locker Groups</h2>
                    <p className="section-text">…</p>
                </section>
                <section className="side-section" id="settings">
                    <h2 className="section-title">Settings</h2>
                    <p className="section-text">…</p>
                </section>
                <section className="side-section" id="developer">
                    <h2 className="section-title">{`<Designer/Developer>`}</h2>
                    <p className="section-text">…</p>
                </section>
            </div>
            <nav className="section-nav">
                <ol>
                    <li className="side-list"><a href="#introduction">Introduction</a></li>
                    <li className="side-list"><a href="#profile-permissions">User Permissions</a></li>
                    <li className="side-list"><a href="#dashboard">Dashboard</a></li>
                    <li className="side-list"><a href="#group">Group</a></li>
                    <li className="side-list"><a href="#locker">Locker</a>
                        <ol>
                            <li className="side-list"><a href="#locker--focus1">Locker Focus 1</a></li>
                            <li className="side-list"><a href="#locker--focus2">Locker Focus 2</a></li>
                            <li className="side-list"><a href="#locker--focus3">Locker Focus 3</a></li>
                            <li className="side-list"><a href="#locker--focus4">Locker Focus 4</a></li>
                            <li className="side-list"><a href="#locker--focus5">Locker Focus 5</a></li>
                            <li className="side-list"><a href="#locker--focus6">Locker Focus 6</a></li>
                            <li className="side-list"><a href="#locker--focus7">Locker Focus 7</a></li>
                            <li className="side-list"><a href="#locker--focus8">Locker Focus 8</a></li>
                        </ol>
                    </li>
                    <li className="side-list"><a href="#locker-groups">Locker Groups</a></li>
                    <li className="side-list"><a href="#settings">Settings</a></li>
                    <li className="side-list"><a href="#developer">{`<Designer/Developer>`}</a></li>

                </ol>
            </nav>
            </main>

            </Col>
        </Row>
        </Container>
        </>
    )
}

export default Documentation;