import React from "react"
import "../../stylesheets/Footer.css"

function Footer() {
  return (
    <>
      <div class="myFooter">
        <footer class="text-center text-lg-start text-white" style={{ backgroundColor: "rgba(0, 0, 0, 0.85" }}>
          <section class="d-flex justify-content-between p-4 bg-primary">
            <div class="me-5">
              <span>Get connected with us on social networks:</span>
            </div>

            <div>
              <a href="https://twitter.com/azam02ali" class="text-white me-4">
                <i class="fab fa-twitter"></i>
              </a>
              <a href="https://www.instagram.com/azamm.alii" class="text-white me-4">
                <i class="fab fa-instagram"></i>
              </a>
              <a href="https://www.linkedin.com/in/azam-ali-1947ab213/" class="text-white me-4">
                <i class="fab fa-linkedin"></i>
              </a>
              <a href="https://github.com/azam-alii" class="text-white me-4">
                <i class="fab fa-github"></i>
              </a>
            </div>
          </section>

          <section class="">
            <div class="container text-center text-md-start mt-5">
              <div class="row mt-3">
                <div class="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                  <h6 class="text-uppercase fw-bold">Window Shop</h6>
                  <hr
                    class="mb-4 mt-0 d-inline-block mx-auto"
                    style={{
                      width: "60px",
                      backgroundColor: "white",
                      height: "2px"
                    }}
                  />
                  <p>There Is No Sore It Will Not Heal, No Store It Will Not Subdue.</p>
                </div>

                <div class="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                  <h6 class="text-uppercase fw-bold">Useful links</h6>
                  <hr
                    class="mb-4 mt-0 d-inline-block mx-auto"
                    style={{
                      width: "60px",
                      backgroundColor: "white",
                      height: "2px"
                    }}
                  />
                  <p>
                    <a href="/" class="text-white">
                      Home
                    </a>
                  </p>
                  <p>
                    <a href="/profile" class="text-white">
                      Your Profile
                    </a>
                  </p>
                  <p>
                    <a href="/cart" class="text-white">
                      Cart
                    </a>
                  </p>
                  <p>
                    <a href="/products" class="text-white">
                      Search product
                    </a>
                  </p>
                </div>

                <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                  <h6 class="text-uppercase fw-bold">Contact</h6>
                  <hr
                    class="mb-4 mt-0 d-inline-block mx-auto"
                    style={{
                      width: "60px",
                      backgroundColor: "white",
                      height: "2px"
                    }}
                  />
                  <p>
                    <i class="fas fa-home mr-3"></i> Rajasthan, RJ 10000, IND
                  </p>
                  <p>
                    <i class="fas fa-envelope mr-3"></i> azam.alii593@gmail.com
                  </p>
                  <p>
                    <i class="fas fa-phone mr-3"></i> +91 9521699650
                  </p>
                </div>
              </div>
            </div>
          </section>

          <div class="text-center p-3" style={{ backgroundClip: "rgba(0, 0, 0, 0.2" }}>
            © 2022 Copyright:
            <a class="text-white" href="/">
              windowshop
            </a>
          </div>
        </footer>
      </div>
    </>
  )
}

export default Footer
