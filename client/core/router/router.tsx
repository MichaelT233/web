import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import React from "react";
import { Header, Footer } from "../ui-shell/shell"
import * as Product from "../../product-client/ui/component";
import * as Order from "../../order-client/ui/component";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export function Router() {
    return (
		<BrowserRouter>
			<QueryClientProvider client={queryClient}>
				<div>
					<Header />
					<div>
						<Routes>
							<Route path ="/" element={<Product.Featured />} />
							<Route path="/category/:category" element={<Product.Category />} />
							<Route path="/search/:text" element={<Product.Search />} />
							<Route path="/item/:id" element={<Order.Item />} />
                            <Route path="/cart/:token" element={<Order.CartListing />} />
						</Routes>
					</div>
					<Footer />
				</div>
			</QueryClientProvider>
		</BrowserRouter>
    );
}
