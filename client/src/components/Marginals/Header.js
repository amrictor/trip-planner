import React, {Component} from 'react';
import './css/marginals.css';
import Navigation from "./Navigation";

/* Renders a text heading above the application with useful information.
 */
class Header extends Component{
  constructor(props) {
    super(props);
  }

  topLevelHeader() {
    return (
      <div className="add-header-height">
        <div className="application-width">
          <div id="responsiveHeaderContainer">

            <a href="http://colostate.edu" id="csuHeaderLink" target="_blank">
              <img id="csuLargeLogo" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0NTAgNTMiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDQ1MCA1MyI+PGcgZmlsbD0iI2ZmZiI+PHBhdGggZD0ibTcwLjggMTcuMWgtNS44Yy0yLjYgMC00IDEuMy00IDMuN3YxMC40YzAgMi40IDEuNCAzLjcgNCAzLjdoNS45YzIuNiAwIDQtMS4zIDQtMy43di0yLjhoLTMuOXYyLjZjMCAuMiAwIC41LS42LjVoLTVjLS41IDAtLjYtLjItLjYtLjV2LTEwYzAtLjMuMS0uNS42LS41aDVjLjYgMCAuNi4zLjYuNXYyLjZoMy45di0yLjhjMC0yLjQtMS40LTMuNy00LjEtMy43Ii8+PHBhdGggZD0ibTg4LjkgMTcuMWgtNi4yYy0yLjYgMC00IDEuMy00IDMuN3YxMC40YzAgMi40IDEuNCAzLjcgNCAzLjdoNi4yYzIuNiAwIDQtMS4zIDQtMy43di0xMC40Yy4xLTIuNC0xLjQtMy43LTQtMy43bS4yIDMuOXYxMGMwIC4yIDAgLjUtLjYuNWgtNS4zYy0uNSAwLS42LS4yLS42LS41di0xMGMwLS4zLjEtLjUuNi0uNWg1LjNjLjUgMCAuNi4yLjYuNSIvPjxwYXRoIGQ9Im0xMDAuNyAxNy4xaC0zLjl2MTcuOGgxMi4xdi0zLjRoLTguMnoiLz48cGF0aCBkPSJtMTIyLjIgMTcuMWgtNi4yYy0yLjYgMC00IDEuMy00IDMuN3YxMC40YzAgMi40IDEuNCAzLjcgNCAzLjdoNi4yYzIuNiAwIDQtMS4zIDQtMy43di0xMC40Yy4xLTIuNC0xLjMtMy43LTQtMy43bS4yIDMuOXYxMGMwIC4yIDAgLjUtLjYuNWgtNS4zYy0uNSAwLS42LS4yLS42LS41di0xMGMwLS4zLjEtLjUuNi0uNWg1LjNjLjUgMCAuNi4yLjYuNSIvPjxwYXRoIGQ9Im0xNDMuOSAyNC42di0zLjhjMC0yLjQtMS40LTMuNy00LTMuN2gtOS44djE3LjdoMy45di02LjZoMy4xbDMuNCA2LjZoNC4zbC0zLjUtNi43YzEuNy0uNCAyLjYtMS42IDIuNi0zLjVtLTkuOS00LjJoNS41Yy41IDAgLjYuMi42LjV2My42YzAgLjMtLjEuNS0uNi41aC01LjV2LTQuNiIvPjxwYXRoIGQ9Im0xNTMuNyAxNy4xbC02LjUgMTcuN2g0LjFsMS40LTQuMmg2LjFsMS40IDQuMmg0LjNsLTYuNS0xNy43aC00LjNtNCAxMC4yaC0zLjlsMS45LTUuOCAyIDUuOCIvPjxwYXRoIGQ9Im0xNzcuNSAxNy4xaC0xMHYxNy43aDEwYzIuNiAwIDQtMS4zIDQtMy43di0xMC4zYy4xLTIuNC0xLjMtMy43LTQtMy43bS02LjEgMy40aDUuN2MuNSAwIC42LjIuNi41djEwYzAgLjMtLjEuNS0uNi41aC01Ljd2LTExIi8+PHBhdGggZD0ibTE5NS42IDE3LjFoLTYuMmMtMi42IDAtNCAxLjMtNCAzLjd2MTAuNGMwIDIuNCAxLjQgMy43IDQgMy43aDYuMmMyLjYgMCA0LTEuMyA0LTMuN3YtMTAuNGMwLTIuNC0xLjQtMy43LTQtMy43bS4xIDMuOXYxMGMwIC4zLS4xLjUtLjYuNWgtNS4zYy0uNSAwLS42LS4yLS42LS41di0xMGMwLS4zLjEtLjUuNi0uNWg1LjNjLjYgMCAuNi4yLjYuNSIvPjxwYXRoIGQ9Im0yMTkuMiAyNC43bC00LjktMWMtLjktLjItLjktLjMtLjktLjh2LTJjMC0uMyAwLS41LjYtLjVoNC41Yy41IDAgLjYuMi42LjV2Mi4xaDMuOHYtMi4yYzAtMi40LTEuNC0zLjctNC0zLjdoLTUuNGMtMi42IDAtNCAxLjMtNCAzLjd2Mi41YzAgMi42IDIgMy4zIDQuMSAzLjhsNC45IDFjLjguMi45LjMuOS44djIuMmMwIC4zLS4xLjUtLjYuNWgtNC45Yy0uNSAwLS42LS4yLS42LS41di0yLjJoLTMuOHYyLjRjMCAyLjQgMS40IDMuNyA0IDMuN2g1LjdjMi42IDAgNC0xLjMgNC0zLjd2LTIuN2MuMS0yLjctMS44LTMuNS00LTMuOSIvPjxwYXRoIGQ9Im0yNDAuMyAxNy4xaC0xNC4zdjMuM2g1LjJ2MTQuNWgzLjl2LTE0LjVoNS4yeiIvPjxwYXRoIGQ9Im0yNDYuMiAxNy4xbC02LjUgMTcuN2g0LjFsMS40LTQuMmg2LjFsMS40IDQuMmg0LjNsLTYuNi0xNy43aC00LjJtNCAxMC4yaC0zLjlsMS45LTUuOCAyIDUuOCIvPjxwYXRoIGQ9Im0yNTYuNCAyMC40aDUuMnYxNC41aDMuOXYtMTQuNWg1LjJ2LTMuM2gtMTQuM3oiLz48cGF0aCBkPSJtMjczLjQgMzQuOWgxMi45di0zLjRoLTl2LTQuMWg3LjR2LTMuM2gtNy40di0zLjZoOXYtMy40aC0xMi45eiIvPjxwYXRoIGQ9Im0zMDYuOCAzMWMwIC4zLS4xLjUtLjYuNWgtNS4yYy0uNSAwLS42LS4yLS42LS41di0xMy45aC0zLjl2MTQuMWMwIDIuNCAxLjQgMy43IDQgMy43aDYuMWMyLjYgMCA0LTEuMyA0LTMuN3YtMTQuMWgtMy45djEzLjl6Ii8+PHBhdGggZD0ibTMyNS43IDI4LjVsLTcuNC0xMS40aC0zLjh2MTcuOGgzLjZ2LTExLjdsNy43IDExLjdoMy42di0xNy44aC0zLjd6Ii8+PHBhdGggZD0ibTMzMy4yIDE3LjFoMy45djE3LjdoLTMuOXoiLz48cGF0aCBkPSJtMzQ4LjUgMzAuMWwtNC4xLTEzaC00LjJsNi4xIDE3LjhoNC4ybDYuMi0xNy44aC00LjJ6Ii8+PHBhdGggZD0ibTM1OS43IDM0LjloMTIuOXYtMy40aC05di00LjFoNy40di0zLjNoLTcuNHYtMy42aDl2LTMuNGgtMTIuOXoiLz48cGF0aCBkPSJtMzkwIDI0LjZ2LTMuOGMwLTIuNC0xLjQtMy43LTQtMy43aC05Ljh2MTcuN2gzLjl2LTYuNmgzLjFsMy40IDYuNmg0LjNsLTMuNS02LjdjMS43LS40IDIuNi0xLjYgMi42LTMuNW0tOS45LTQuMmg1LjVjLjUgMCAuNi4yLjYuNXYzLjZjMCAuMy0uMS41LS42LjVoLTUuNXYtNC42Ii8+PHBhdGggZD0ibTQwMy4zIDI0LjdsLTQuOS0xYy0uOS0uMi0uOS0uMy0uOS0uOHYtMmMwLS4zIDAtLjUuNi0uNWg0LjVjLjUgMCAuNi4yLjYuNXYyLjFoMy44di0yLjJjMC0yLjQtMS40LTMuNy00LTMuN2gtNS40Yy0yLjYgMC00IDEuMy00IDMuN3YyLjVjMCAyLjYgMiAzLjMgNC4xIDMuOGw0LjkgMWMuOC4yLjkuMy45Ljh2Mi4yYzAgLjMtLjEuNS0uNi41aC00LjljLS41IDAtLjYtLjItLjYtLjV2LTIuMmgtMy44djIuNGMwIDIuNCAxLjQgMy43IDQgMy43aDUuN2MyLjYgMCA0LTEuMyA0LTMuN3YtMi43Yy4xLTIuNy0xLjgtMy41LTQtMy45Ii8+PHBhdGggZD0ibTQxMS4xIDE3LjFoMy45djE3LjdoLTMuOXoiLz48cGF0aCBkPSJtNDE3LjcgMjAuNGg1LjF2MTQuNWgzLjl2LTE0LjVoNS4ydi0zLjNoLTE0LjJ6Ii8+PHBhdGggZD0ibTQ0NS44IDE3LjFsLTQuMiA3LjctNC4xLTcuN2gtNC4zbDYuNSAxMS41djYuM2gzLjl2LTYuM2w2LjQtMTEuNXoiLz48L2c+PGcgZmlsbD0iI2NiYzQ2ZSI+PHBhdGggZD0ibTI2LjUgNTEuOGMtMTQgMC0yNS4zLTExLjQtMjUuMy0yNS4zIDAtMTQgMTEuNC0yNS4zIDI1LjMtMjUuMyAxNCAwIDI1LjMgMTEuNCAyNS4zIDI1LjMgMCAxMy45LTExLjQgMjUuMy0yNS4zIDI1LjMiLz48cGF0aCBkPSJNMjYuNSw1Mi45QzExLjksNTIuOSwwLDQxLDAsMjYuNEMwLDExLjksMTEuOSwwLDI2LjUsMEM0MSwwLDUyLjksMTEuOSw1Mi45LDI2LjRDNTIuOSw0MSw0MSw1Mi45LDI2LjUsNTIuOQoJCQkJeiIvPjwvZz48cGF0aCBkPSJtMjYuNSAxLjFjLTE0IDAtMjUuNCAxMS40LTI1LjQgMjUuMyAwIDE0IDExLjQgMjUuNCAyNS40IDI1LjQgMTQgMCAyNS4zLTExLjQgMjUuMy0yNS40IDAtMTMuOS0xMS40LTI1LjMtMjUuMy0yNS4zIiBmaWxsPSIjMDA0YzIzIi8+PGcgZmlsbD0iI2ZmZiI+PHBhdGggZD0ibTIyLjUgMzIuNGMuNy0xLjEgMS40LTMuNCAxLTQuNC0uNy0uMy0xLjUtLjgtMi0xLjYtLjUtLjctLjgtMS41LTEuNy0xLjgtLjYtLjItMS4yLS4xLTEuNy4yLS44LjQtMSAxLjUtMS4xIDIuMy0uMSAxLjcuMyA0LjMgMSA1LjkuNCAxLjIgMS41IDMuMiAyLjggNS4xLS40LTIuOSAxLjMtNC45IDEuNy01LjdtLTIuMy0zLjhjLS4zLS42LTEuMi0uNS0xLjYtLjctLjctLjQtLjYtMS40IDAtMS45LjgtLjcgMi45IDEuNiAyLjQgMy41LS4yIDAtLjMtLjEtLjgtLjkiLz48cGF0aCBkPSJtMTUuOCAyMS40Yy0uOS4yLTEuMSAxLjUtLjQgMi4zLS42LS4xLTEuNi0uOS0zLjgtLjItLjguMi0xLjcuNS0xLjggMS41LS4xLjcuOSAxLjUgMS41IDIgLjcuNSAxLjcuNSAyLjIgMS4zLjUuNy45IDEuNyAxIDIuNy4yIDEuOC4yIDQuMSAxLjQgNS42LjItLjktLjQtMi45LS40LTUuNSAwLTEtLjQtMi4xLS45LTIuOCAxLS4xIDEuMS4xIDEuMS0uMy4xLS4zLS4xLS43LS4zLTEtLjgtLjktMS44LS40LTIuOC0uNy0uNi0uMi0xLjYtLjUtMS43LTEuNCAwLS42IDEuOS0uNyAxLjktLjcgMS41LjEgMS4zIDEgMi40IDEuMS45LjEgMS4yLS44IDEuNS0xLjQuMy0uOS44LTIuOC0uOS0yLjUiLz48cGF0aCBkPSJtMjYuNSAzMC44YzAgMCAwIDAgMCAwLS45IDAtMS4zLjctMi4xIDEuNS0xLjMgMS40LTQgNS0yLjEgNi43LjkuOCAyIDEuMyAzLjYuOC40LS4zLjItMS4xIDAtMS40LS43LTEtMS45LS42LTIuMi0xLjEtLjMtLjUtLjEtLjguMS0xLjEuMy0uMy43LS4zIDEuMS0uMi43LjIgMS4xLjQgMS41LjggMCAwIDAgMCAwIDAgLjQtLjQuOS0uNyAxLjUtLjguNC0uMS44LS4yIDEuMS4yLjIuMi40LjYuMSAxLjEtLjMuNS0xLjUuMS0yLjIgMS4xLS4yLjQtLjQgMS4yLS4xIDEuNCAxLjYuNSAyLjcgMCAzLjYtLjggMi0xLjctLjctNS4zLTIuMS02LjctLjUtLjctMS0xLjQtMS44LTEuNSIvPjxwYXRoIGQ9Im00MS42IDIzLjRjLTIuMi0uNy0zLjIuMi0zLjguMi43LS44LjUtMi4xLS40LTIuMy0xLjctLjMtMS4zIDEuNi0uOCAyLjUuMy41LjYgMS41IDEuNSAxLjQgMS0uMS45LS45IDIuNC0xLjEgMCAwIDEuOS4xIDEuOS43LS4xLjktMSAxLjItMS43IDEuNC0uOS4zLTItLjItMi44LjctLjIuMy0uNC43LS4zIDEgLjEuMy4xLjIgMS4yLjMtLjYuNy0uOSAxLjgtLjkgMi44IDAgMi42LS43IDQuNi0uNCA1LjUgMS4zLTEuNSAxLjItMy44IDEuNC01LjYuMS0uOS41LTIgLjktMi43LjUtLjggMS41LS44IDIuMi0xLjMuNi0uNSAxLjYtMS4zIDEuNS0yLS4zLS45LTEuMi0xLjItMS45LTEuNSIvPjxwYXRoIGQ9Im0yNi40IDIuNWMtMTMuMiAwLTI0IDEwLjgtMjQgMjQgMCAxMy4yIDEwLjggMjQgMjQgMjQgMTMuMiAwIDIzLjktMTAuOCAyMy45LTI0IC4xLTEzLjMtMTAuNy0yNC0yMy45LTI0bTE1LjEgNDAuNWMtLjcuMy0xLjUuNC0yLjIuMS0uNi0uMy0xLS44LTEuMS0xLjUtLjEtMSAuNC0yLjEuOS0yLjguNi0xLjEgMi4xLTMgMy44LTQuMiAyLjQtMS44IDQuMS0yLjMgMy41LTIuNy0uNC0uMy0yLjcgMS0zLjIgMS4yLTIuNiAxLjMtNi4xIDUuMS02LjUgOC0uMyAyIDEuOCAzLjUgMy41IDMuMy01LjYgNC42LTExLjcgNC43LTEzLjcgNC44LTIgMC04LjItLjItMTMuNy00LjggMS43LjIgMy44LTEuMyAzLjUtMy4zLS40LTIuOC00LTYuNi02LjUtOC0uNS0uMi0yLjctMS41LTMuMi0xLjItLjYuNCAxLjEuOSAzLjUgMi43IDEuNyAxLjMgMy4yIDMuMSAzLjggNC4yLjUuOCAxIDEuOS45IDIuOC0uMS43LS41IDEuMi0xLjEgMS41LS43LjMtMS41LjItMi4yLS4xLTEuMS0uNC0yLjEtMS4zLTIuOS0yLjQtMS41LTItMy00LjQtMy43LTYuOS42IDEuNCA0LjcgNy40IDYuNSA3LjUgMS44LjEtMS44LTQuOC00LjMtNi45LS42LS41LTEuMy0xLjEtMS40LTItLjEtLjcuMi0xLjEuOS0xLjEgMSAwIDMuNiAxLjMgMy42IDEuMy00LjUtOC4xIDIuNC0xMi4yLS41LTE0LTEtLjYtMy4xIDAtNC4zLjIgMTAuNy02LjMgMTIuNSAwIDE1LjggMi45LjUuNSAyLjggMCAzLjItLjUuNi0uNyAxLjctMy4yLjQtNC44LTEuOC0yLjMtOS4yLTktMTYuMS0zLjYgMy42LTUuMiAxMS4xLTkgMTcuOS04LjggNi43LS4yIDE0LjIgMy42IDE3LjggOC44LTYuOS01LjQtMTQuMyAxLjMtMTYuMiAzLjYtMS4zIDEuNi0uMiA0LjEuNCA0LjguNC41IDIuNyAxIDMuMi41IDMuMi0yLjkgNS4xLTkuMiAxNS44LTIuOS0xLjItLjItMy4zLS44LTQuMy0uMi0yLjkgMS44IDQgNS45LS41IDE0IDAgLjEgMi42LTEuMyAzLjctMS4zLjcgMCAxIC41LjkgMS4xLS4xLjktLjggMS41LTEuNCAyLTIuNSAyLjEtNi4yIDctNC4zIDYuOSAxLjgtLjEgNS45LTYgNi41LTcuNS0uNyAyLjUtMi4yIDQuOC0zLjcgNi45LS45IDEuMS0xLjkgMi0zIDIuNCIvPjxwYXRoIGQ9Im0zNC44IDI0LjhjLS41LS4zLTEuMS0uNC0xLjctLjItLjkuMi0xLjEgMS0xLjcgMS44LS41LjgtMS4zIDEuMy0yIDEuNi0uNCAxIC4zIDMuMyAxIDQuNC40LjggMiAyLjggMS43IDUuNyAxLjMtMS45IDIuMy0zLjkgMi43LTUuMS44LTEuNiAxLjEtNC4yIDEtNS45IDAtLjgtLjItMS44LTEtMi4zbS0uNSAzLjFjLS40LjItMS4zLjEtMS42LjctLjUuOC0uNi45LS44LjgtLjUtMS44IDEuNi00LjIgMi40LTMuNS43LjYuNyAxLjUgMCAyIi8+PHBhdGggZD0ibTI5LjEgNDAuM2MtLjkuMS0xLjguMy0yLjYuMy0uOCAwLTEuNy0uMi0yLjYtLjMtLjEgMC0uMi4xLS4yLjEtLjUgMS4xIDIuNCAxLjcgMi44IDEuNy40IDAgMy40LS42IDIuOC0xLjcgMCAwLS4xLS4xLS4yLS4xIi8+PC9nPjwvc3ZnPg=="
                   width="350" height="45" alt="Colorado State University"/>
              <img id="csuMedLogo"   src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMjEgNTMiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDIyMSA1MyI+PGcgZmlsbD0iI2ZmZiI+PHBhdGggZD0ibTY0LjIgMjMuM2g0LjJjMS44IDAgMi45LS45IDIuOS0yLjZ2LTEuOWgtMi44djEuOGMwIC4yIDAgLjQtLjQuNGgtMy41Yy0uNCAwLS40LS4yLS40LS40di03LjFjMC0uMi4xLS40LjQtLjRoMy40Yy40IDAgLjQuMi40LjR2MS44aDIuOHYtMS45YzAtMS43LTEtMi42LTIuOS0yLjZoLTQuMmMtMS44IDAtMi45LjktMi45IDIuNnY3LjNjLjEgMS43IDEuMSAyLjYgMyAyLjYiLz48cGF0aCBkPSJtNzYuNyAyMy4zaDQuNGMxLjggMCAyLjktLjkgMi45LTIuNnYtNy4zYzAtMS43LTEtMi42LTIuOS0yLjZoLTQuNGMtMS44IDAtMi45LjktMi45IDIuNnY3LjNjMCAxLjcgMS4xIDIuNiAyLjkgMi42bS0uMS0yLjd2LTcuMWMwLS4yLjEtLjQuNC0uNGgzLjdjLjQgMCAuNC4yLjQuNHY3LjFjMCAuMiAwIC40LS40LjRoLTMuN2MtLjQgMC0uNC0uMi0uNC0uNCIvPjxwYXRoIGQ9Im05NS4yIDIxaC01Ljh2LTEwLjJoLTIuOHYxMi41aDguNnoiLz48cGF0aCBkPSJtMTA3LjUgMjAuN3YtNy4zYzAtMS43LTEtMi42LTIuOS0yLjZoLTQuNGMtMS44IDAtMi45LjktMi45IDIuNnY3LjNjMCAxLjcgMSAyLjYgMi45IDIuNmg0LjRjMS45IDAgMi45LS45IDIuOS0yLjZtLTIuNy03LjJ2Ny4xYzAgLjIgMCAuNC0uNC40aC0zLjdjLS40IDAtLjQtLjItLjQtLjR2LTcuMWMwLS4yLjEtLjQuNC0uNGgzLjdjLjMgMCAuNC4yLjQuNCIvPjxwYXRoIGQ9Im0xMTguMSAxOC42YzEuMi0uMyAxLjktMS4yIDEuOS0yLjV2LTIuN2MwLTEuNy0xLTIuNi0yLjktMi42aC02Ljl2MTIuNWgyLjh2LTQuNmgyLjJsMi40IDQuNmgzbC0yLjUtNC43bS01LjItNS41aDMuOWMuNCAwIC40LjIuNC40djIuNWMwIC4yLS4xLjQtLjQuNGgtMy45di0zLjMiLz48cGF0aCBkPSJtMTI2LjIgMjAuM2g0LjNsMSAzaDNsLTQuNi0xMi41aC0zbC00LjYgMTIuNWgyLjlsMS0zbS44LTIuM2wxLjQtNC4xIDEuNCA0LjFoLTIuOCIvPjxwYXRoIGQ9Im0xNDMuNyAxMC44aC03LjF2MTIuNWg3LjFjMS44IDAgMi45LS45IDIuOS0yLjZ2LTcuM2MwLTEuNy0xLTIuNi0yLjktMi42bS00LjMgMi4zaDRjLjQgMCAuNC4yLjQuNHY3LjFjMCAuMi0uMS40LS40LjRoLTR2LTcuOSIvPjxwYXRoIGQ9Im0xNTIuMSAyMy4zaDQuNGMxLjggMCAyLjktLjkgMi45LTIuNnYtNy4zYzAtMS43LTEtMi42LTIuOS0yLjZoLTQuNGMtMS44IDAtMi45LjktMi45IDIuNnY3LjNjMCAxLjcgMSAyLjYgMi45IDIuNm0tLjEtMi43di03LjFjMC0uMi4xLS40LjQtLjRoMy43Yy40IDAgLjQuMi40LjR2Ny4xYzAgLjItLjEuNC0uNC40aC0zLjdjLS40IDAtLjQtLjItLjQtLjQiLz48cGF0aCBkPSJtMTczLjIgMTYuMWwtMy40LS43Yy0uNi0uMS0uNy0uMi0uNy0uNnYtMS40YzAtLjIgMC0uNC40LS40aDMuMmMuNCAwIC40LjEuNC40djEuNGgyLjd2LTEuNWMwLTEuNy0xLTIuNi0yLjktMi42aC0zLjhjLTEuOCAwLTIuOS45LTIuOSAyLjZ2MS44YzAgMS44IDEuNCAyLjQgMi45IDIuN2wzLjQuN2MuNi4xLjcuMi43LjZ2MS42YzAgLjItLjEuNC0uNC40aC0zLjVjLS40IDAtLjQtLjEtLjQtLjR2LTEuN2gtMi43djEuN2MwIDEuNyAxIDIuNiAyLjkgMi42aDQuMWMxLjggMCAyLjktLjkgMi45LTIuNnYtMS45YzAtMS45LTEuNC0yLjQtMi45LTIuNyIvPjxwYXRoIGQ9Im0xODggMTAuOGgtMTB2Mi4zaDMuNnYxMC4yaDIuOHYtMTAuMmgzLjZ6Ii8+PHBhdGggZD0ibTE5Mi4zIDEwLjhsLTQuNiAxMi41aDIuOWwxLTNoNC4zbDEgM2gzbC00LjYtMTIuNWgtM20yLjggNy4yaC0yLjhsMS40LTQuMSAxLjQgNC4xIi8+PHBhdGggZD0ibTE5OS41IDEzLjFoMy42djEwLjJoMi44di0xMC4yaDMuN3YtMi4zaC0xMC4xeiIvPjxwYXRoIGQ9Im0yMjAuNiAxMy4xdi0yLjNoLTkuMXYxMi41aDkuMXYtMi4zaC02LjR2LTIuOWg1LjN2LTIuNGgtNS4zdi0yLjZ6Ii8+PHBhdGggZD0ibTY4LjYgMzkuMmMwIC4yLS4xLjQtLjQuNGgtMy43Yy0uNCAwLS40LS4yLS40LS40di05LjhoLTIuOHY5LjljMCAxLjcgMSAyLjYgMi45IDIuNmg0LjNjMS44IDAgMi45LS45IDIuOS0yLjZ2LTkuOWgtMi44djkuOCIvPjxwYXRoIGQ9Im04MiAzNy40bC01LjItOGgtMi44djEyLjVoMi42di04LjJsNS40IDguMmgyLjZ2LTEyLjVoLTIuNnoiLz48cGF0aCBkPSJtODcuMyAyOS40aDIuOHYxMi41aC0yLjh6Ii8+PHBhdGggZD0ibTk4LjEgMzguNmwtMi45LTkuMmgtM2w0LjQgMTIuNWgyLjlsNC40LTEyLjVoLTN6Ii8+PHBhdGggZD0ibTEwNiA0MS45aDkuMXYtMi4zaC02LjN2LTIuOWg1LjJ2LTIuM2gtNS4ydi0yLjZoNi4zdi0yLjRoLTkuMXoiLz48cGF0aCBkPSJtMTI3LjQgMzQuN3YtMi43YzAtMS43LTEtMi42LTIuOS0yLjZoLTYuOXYxMi41aDIuOHYtNC42aDIuMmwyLjQgNC42aDNsLTIuNS00LjdjMS4zLS4zIDEuOS0xLjIgMS45LTIuNW0tNy0yLjloMy45Yy40IDAgLjQuMi40LjR2Mi41YzAgLjItLjEuNC0uNC40aC0zLjl2LTMuMyIvPjxwYXRoIGQ9Im0xMzYuOCAzNC44bC0zLjQtLjdjLS42LS4xLS43LS4yLS43LS42di0xLjRjMC0uMiAwLS40LjQtLjRoMy4yYy40IDAgLjQuMS40LjR2MS40aDIuN3YtMS41YzAtMS43LTEtMi42LTIuOS0yLjZoLTMuOGMtMS44IDAtMi45LjktMi45IDIuNnYxLjhjMCAxLjggMS40IDIuNCAyLjkgMi43bDMuNC43Yy42LjEuNy4yLjcuNnYxLjZjMCAuMi0uMS40LS40LjRoLTMuNWMtLjQgMC0uNC0uMS0uNC0uNHYtMS42aC0yLjd2MS43YzAgMS43IDEgMi42IDIuOSAyLjZoNC4xYzEuOCAwIDIuOS0uOSAyLjktMi42di0xLjljMC0yLTEuNC0yLjUtMi45LTIuOCIvPjxwYXRoIGQ9Im0xNDIuMyAyOS40aDIuOHYxMi41aC0yLjh6Ii8+PHBhdGggZD0ibTE0NyAzMS44aDMuNnYxMC4xaDIuOHYtMTAuMWgzLjZ2LTIuNGgtMTB6Ii8+PHBhdGggZD0ibTE2My45IDM0LjlsLTIuOS01LjVoLTNsNC41IDguMnY0LjNoMi44di00LjNsNC41LTguMmgtM3oiLz48L2c+PGcgZmlsbD0iI2NiYzQ2ZSI+PHBhdGggZD0ibTI2LjUgNTEuOGMtMTQgMC0yNS4zLTExLjQtMjUuMy0yNS4zIDAtMTQgMTEuNC0yNS4zIDI1LjMtMjUuMyAxNCAwIDI1LjMgMTEuNCAyNS4zIDI1LjMgMCAxMy45LTExLjQgMjUuMy0yNS4zIDI1LjMiLz48cGF0aCBkPSJNMjYuNSw1Mi45QzExLjksNTIuOSwwLDQxLDAsMjYuNEMwLDExLjksMTEuOSwwLDI2LjUsMEM0MSwwLDUyLjksMTEuOSw1Mi45LDI2LjQKCQkJCQlDNTIuOSw0MSw0MSw1Mi45LDI2LjUsNTIuOXoiLz48L2c+PHBhdGggZD0ibTI2LjUgMS4xYy0xNCAwLTI1LjQgMTEuNC0yNS40IDI1LjMgMCAxNCAxMS40IDI1LjQgMjUuNCAyNS40IDE0IDAgMjUuMy0xMS40IDI1LjMtMjUuNCAwLTEzLjktMTEuNC0yNS4zLTI1LjMtMjUuMyIgZmlsbD0iIzAwNGMyMyIvPjxnIGZpbGw9IiNmZmYiPjxwYXRoIGQ9Im0yMi41IDMyLjRjLjctMS4xIDEuNC0zLjQgMS00LjQtLjctLjMtMS41LS44LTItMS42LS41LS43LS44LTEuNS0xLjctMS44LS42LS4yLTEuMi0uMS0xLjcuMi0uOC40LTEgMS41LTEuMSAyLjMtLjEgMS43LjMgNC4zIDEgNS45LjQgMS4yIDEuNSAzLjIgMi44IDUuMS0uNC0yLjkgMS4zLTQuOSAxLjctNS43bS0yLjMtMy44Yy0uMy0uNi0xLjItLjUtMS42LS43LS43LS40LS42LTEuNCAwLTEuOS44LS43IDIuOSAxLjYgMi40IDMuNS0uMiAwLS4zLS4xLS44LS45Ii8+PHBhdGggZD0ibTE1LjggMjEuNGMtLjkuMi0xLjEgMS41LS40IDIuMy0uNi0uMS0xLjYtLjktMy44LS4yLS44LjItMS43LjUtMS44IDEuNS0uMS43LjkgMS41IDEuNSAyIC43LjUgMS43LjUgMi4yIDEuMy41LjcuOSAxLjcgMSAyLjcuMiAxLjguMiA0LjEgMS40IDUuNi4yLS45LS40LTIuOS0uNC01LjUgMC0xLS40LTIuMS0uOS0yLjggMS0uMSAxLjEuMSAxLjEtLjMuMS0uMy0uMS0uNy0uMy0xLS44LS45LTEuOC0uNC0yLjgtLjctLjYtLjItMS42LS41LTEuNy0xLjQgMC0uNiAxLjktLjcgMS45LS43IDEuNS4xIDEuMyAxIDIuNCAxLjEuOS4xIDEuMi0uOCAxLjUtMS40LjMtLjkuOC0yLjgtLjktMi41Ii8+PHBhdGggZD0ibTI2LjUgMzAuOGMwIDAgMCAwIDAgMC0uOSAwLTEuMy43LTIuMSAxLjUtMS4zIDEuNC00IDUtMi4xIDYuNy45LjggMiAxLjMgMy42LjguNC0uMy4yLTEuMSAwLTEuNC0uNy0xLTEuOS0uNi0yLjItMS4xLS4zLS41LS4xLS44LjEtMS4xLjMtLjMuNy0uMyAxLjEtLjIuNy4yIDEuMS40IDEuNS44IDAgMCAwIDAgMCAwIC40LS40LjktLjcgMS41LS44LjQtLjEuOC0uMiAxLjEuMi4yLjIuNC42LjEgMS4xLS4zLjUtMS41LjEtMi4yIDEuMS0uMi40LS40IDEuMi0uMSAxLjQgMS42LjUgMi43IDAgMy42LS44IDItMS43LS43LTUuMy0yLjEtNi43LS41LS43LTEtMS40LTEuOC0xLjUiLz48cGF0aCBkPSJtNDEuNiAyMy40Yy0yLjItLjctMy4yLjItMy44LjIuNy0uOC41LTIuMS0uNC0yLjMtMS43LS4zLTEuMyAxLjYtLjggMi41LjMuNS42IDEuNSAxLjUgMS40IDEtLjEuOS0uOSAyLjQtMS4xIDAgMCAxLjkuMSAxLjkuNy0uMS45LTEgMS4yLTEuNyAxLjQtLjkuMy0yLS4yLTIuOC43LS4yLjMtLjQuNy0uMyAxIC4xLjMuMS4yIDEuMi4zLS42LjctLjkgMS44LS45IDIuOCAwIDIuNi0uNyA0LjYtLjQgNS41IDEuMy0xLjUgMS4yLTMuOCAxLjQtNS42LjEtLjkuNS0yIC45LTIuNy41LS44IDEuNS0uOCAyLjItMS4zLjYtLjUgMS42LTEuMyAxLjUtMi0uMy0uOS0xLjItMS4yLTEuOS0xLjUiLz48cGF0aCBkPSJtMjYuNCAyLjVjLTEzLjIgMC0yNCAxMC44LTI0IDI0IDAgMTMuMiAxMC44IDI0IDI0IDI0IDEzLjIgMCAyNC0xMC44IDI0LTI0IDAtMTMuMy0xMC44LTI0LTI0LTI0bTE0LjIgNDEuOGMwIDAgMCAwIDAgMG0uOS0xLjNjLS43LjMtMS41LjQtMi4yLjEtLjYtLjMtMS0uOC0xLjEtMS41LS4xLTEgLjQtMi4xLjktMi44LjYtMS4xIDIuMS0zIDMuOC00LjIgMi40LTEuOCA0LjEtMi4zIDMuNS0yLjctLjQtLjMtMi43IDEtMy4yIDEuMi0yLjYgMS4zLTYuMSA1LjEtNi41IDgtLjMgMiAxLjggMy41IDMuNSAzLjMtNS42IDQuNi0xMS43IDQuNy0xMy43IDQuOC0yIDAtOC4yLS4yLTEzLjctNC44IDEuNy4yIDMuOC0xLjMgMy41LTMuMy0uNC0yLjgtNC02LjYtNi41LTgtLjUtLjItMi43LTEuNS0zLjItMS4yLS42LjQgMS4xLjkgMy41IDIuNyAxLjcgMS4zIDMuMiAzLjEgMy44IDQuMi41LjggMSAxLjkuOSAyLjgtLjEuNy0uNSAxLjItMS4xIDEuNS0uNy4zLTEuNS4yLTIuMi0uMS0xLjEtLjQtMi4xLTEuMy0yLjktMi40LTEuNS0yLTMtNC40LTMuNy02LjkuNiAxLjQgNC43IDcuNCA2LjUgNy41IDEuOC4xLTEuOC00LjgtNC4zLTYuOS0uNi0uNS0xLjMtMS4xLTEuNC0yLS4xLS43LjItMS4xLjktMS4xIDEgMCAzLjYgMS4zIDMuNiAxLjMtNC41LTguMSAyLjQtMTIuMi0uNS0xNC0xLS42LTMuMSAwLTQuMy4yIDEwLjctNi4zIDEyLjUgMCAxNS44IDIuOS41LjUgMi44IDAgMy4yLS41LjYtLjcgMS43LTMuMi40LTQuOC0xLjgtMi4zLTkuMi05LTE2LjEtMy42IDMuNi01LjIgMTEuMS05IDE3LjktOC44IDYuNy0uMiAxNC4yIDMuNiAxNy44IDguOC02LjktNS40LTE0LjMgMS4zLTE2LjIgMy42LTEuMyAxLjYtLjIgNC4xLjQgNC44LjQuNSAyLjcgMSAzLjIuNSAzLjItMi45IDUuMS05LjIgMTUuOC0yLjktMS4yLS4yLTMuMy0uOC00LjMtLjItMi45IDEuOCA0IDUuOS0uNSAxNCAwIC4xIDIuNi0xLjMgMy43LTEuMy43IDAgMSAuNS45IDEuMS0uMS45LS44IDEuNS0xLjQgMi0yLjUgMi4xLTYuMiA3LTQuMyA2LjkgMS44LS4xIDUuOS02IDYuNS03LjUtLjcgMi41LTIuMiA0LjgtMy43IDYuOS0uOSAxLjEtMS45IDItMyAyLjQiLz48cGF0aCBkPSJtMzQuOCAyNC44Yy0uNS0uMy0xLjEtLjQtMS43LS4yLS45LjItMS4xIDEtMS43IDEuOC0uNS44LTEuMyAxLjMtMiAxLjYtLjQgMSAuMyAzLjMgMSA0LjQuNC44IDIgMi44IDEuNyA1LjcgMS4zLTEuOSAyLjMtMy45IDIuNy01LjEuOC0xLjYgMS4xLTQuMiAxLTUuOSAwLS44LS4yLTEuOC0xLTIuM20tLjUgMy4xYy0uNC4yLTEuMy4xLTEuNi43LS41LjgtLjYuOS0uOC44LS41LTEuOCAxLjYtNC4yIDIuNC0zLjUuNy42LjcgMS41IDAgMiIvPjxwYXRoIGQ9Im0yOS4xIDQwLjNjLS45LjEtMS44LjMtMi42LjMtLjggMC0xLjctLjItMi42LS4zLS4xIDAtLjIuMS0uMi4xLS41IDEuMSAyLjQgMS43IDIuOCAxLjcuNCAwIDMuNC0uNiAyLjgtMS43IDAgMC0uMS0uMS0uMi0uMSIvPjwvZz48L3N2Zz4="
                   width="172" height="45" alt="Colorado State University"/>
              <img id="csuSmallLogo" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNDUgNTMiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDE0NSA1MyI+PGcgZmlsbD0iI2ZmZiI+PHBhdGggZD0ibTc5LjggOS4zaC0xMC4yYy00LjUgMC03IDIuMy03IDYuNHYxOGMwIDQuMSAyLjUgNi40IDcgNi40aDEwLjJjNC41IDAgNy0yLjMgNy02LjR2LTQuOGgtNi44djQuNWMwIC40LS4xLjktMS4xLjloLTguNmMtLjkgMC0xLS40LTEtLjl2LTE3LjVjMC0uNS4xLS45IDEtLjloOC43YzEgMCAxLjEuNCAxLjEuOXY0LjVoNi44di00LjhjLS4xLTQuMS0yLjUtNi4zLTcuMS02LjMiLz48cGF0aCBkPSJtMTA4LjIgMjIuNGwtOC41LTEuN2MtMS41LS4zLTEuNi0uNi0xLjYtMS40di0zLjRjMC0uNC4xLS45IDEuMS0uOWg3LjljLjkgMCAxIC40IDEgLjl2My42aDYuN3YtMy44YzAtNC4xLTIuNS02LjQtNy02LjRoLTkuNGMtNC41IDAtNyAyLjMtNyA2LjR2NC4zYzAgNC41IDMuNCA1LjggNy4xIDYuNWw4LjUgMS43YzEuNS4zIDEuNi42IDEuNiAxLjR2My44YzAgLjUtLjIuOS0xIC45aC04LjZjLS45IDAtMS0uNC0xLS45di0zLjloLTYuN3Y0LjFjMCA0LjEgMi41IDYuNCA3IDYuNGgxMGM0LjUgMCA3LTIuMyA3LTYuNHYtNC43YzAtNC43LTMuNi01LjgtNy4xLTYuNSIvPjxwYXRoIGQ9Im0xMzcuNCA5LjN2MjQuMWMwIC41LS4xLjktMSAuOWgtOWMtMSAwLTEuMS0uNC0xLjEtLjl2LTI0LjFoLTYuOHYyNC40YzAgNC4xIDIuNSA2LjQgNyA2LjRoMTAuNmM0LjUgMCA3LTIuMyA3LTYuNHYtMjQuNGgtNi43Ii8+PC9nPjxnIGZpbGw9IiNjYmM0NmUiPjxwYXRoIGQ9Im0yNi41IDUxLjhjLTE0IDAtMjUuMy0xMS40LTI1LjMtMjUuMyAwLTE0IDExLjQtMjUuMyAyNS4zLTI1LjMgMTQgMCAyNS4zIDExLjQgMjUuMyAyNS4zIDAgMTMuOS0xMS40IDI1LjMtMjUuMyAyNS4zIi8+PHBhdGggZD0iTTI2LjUsNTIuOUMxMS45LDUyLjksMCw0MSwwLDI2LjRDMCwxMS45LDExLjksMCwyNi41LDBDNDEsMCw1Mi45LDExLjksNTIuOSwyNi40QzUyLjksNDEsNDEsNTIuOSwyNi41LDUyLjkKCQkJCXoiLz48L2c+PHBhdGggZD0ibTI2LjUgMS4xYy0xNCAwLTI1LjQgMTEuNC0yNS40IDI1LjMgMCAxNCAxMS40IDI1LjQgMjUuNCAyNS40IDE0IDAgMjUuMy0xMS40IDI1LjMtMjUuNCAwLTEzLjktMTEuNC0yNS4zLTI1LjMtMjUuMyIgZmlsbD0iIzAwNGMyMyIvPjxnIGZpbGw9IiNmZmYiPjxwYXRoIGQ9Im0yMi41IDMyLjRjLjctMS4xIDEuNC0zLjQgMS00LjQtLjctLjMtMS41LS44LTItMS42LS41LS43LS44LTEuNS0xLjctMS44LS42LS4yLTEuMi0uMS0xLjcuMi0uOC40LTEgMS41LTEuMSAyLjMtLjEgMS43LjMgNC4zIDEgNS45LjQgMS4yIDEuNSAzLjIgMi44IDUuMS0uNC0yLjkgMS4zLTQuOSAxLjctNS43bS0yLjMtMy44Yy0uMy0uNi0xLjItLjUtMS42LS43LS43LS40LS42LTEuNCAwLTEuOS44LS43IDIuOSAxLjYgMi40IDMuNS0uMiAwLS4zLS4xLS44LS45Ii8+PHBhdGggZD0ibTE1LjggMjEuNGMtLjkuMi0xLjEgMS41LS40IDIuMy0uNi0uMS0xLjYtLjktMy44LS4yLS44LjItMS43LjUtMS44IDEuNS0uMS43LjkgMS41IDEuNSAyIC43LjUgMS43LjUgMi4yIDEuMy41LjcuOSAxLjcgMSAyLjcuMiAxLjguMiA0LjEgMS40IDUuNi4yLS45LS40LTIuOS0uNC01LjUgMC0xLS40LTIuMS0uOS0yLjggMS0uMSAxLjEuMSAxLjEtLjMuMS0uMy0uMS0uNy0uMy0xLS44LS45LTEuOC0uNC0yLjgtLjctLjYtLjItMS42LS41LTEuNy0xLjQgMC0uNiAxLjktLjcgMS45LS43IDEuNS4xIDEuMyAxIDIuNCAxLjEuOS4xIDEuMi0uOCAxLjUtMS40LjMtLjkuOC0yLjgtLjktMi41Ii8+PHBhdGggZD0ibTI2LjUgMzAuOGMwIDAgMCAwIDAgMC0uOSAwLTEuMy43LTIuMSAxLjUtMS4zIDEuNC00IDUtMi4xIDYuNy45LjggMiAxLjMgMy42LjguNC0uMy4yLTEuMSAwLTEuNC0uNy0xLTEuOS0uNi0yLjItMS4xLS4zLS41LS4xLS44LjEtMS4xLjMtLjMuNy0uMyAxLjEtLjIuNy4yIDEuMS40IDEuNS44IDAgMCAwIDAgMCAwIC40LS40LjktLjcgMS41LS44LjQtLjEuOC0uMiAxLjEuMi4yLjIuNC42LjEgMS4xLS4zLjUtMS41LjEtMi4yIDEuMS0uMi40LS40IDEuMi0uMSAxLjQgMS42LjUgMi43IDAgMy42LS44IDItMS43LS43LTUuMy0yLjEtNi43LS41LS43LTEtMS40LTEuOC0xLjUiLz48cGF0aCBkPSJtNDEuNiAyMy40Yy0yLjItLjctMy4yLjItMy44LjIuNy0uOC41LTIuMS0uNC0yLjMtMS43LS4zLTEuMyAxLjYtLjggMi41LjMuNS42IDEuNSAxLjUgMS40IDEtLjEuOS0uOSAyLjQtMS4xIDAgMCAxLjkuMSAxLjkuNy0uMS45LTEgMS4yLTEuNyAxLjQtLjkuMy0yLS4yLTIuOC43LS4yLjMtLjQuNy0uMyAxIC4xLjMuMS4yIDEuMi4zLS42LjctLjkgMS44LS45IDIuOCAwIDIuNi0uNyA0LjYtLjQgNS41IDEuMy0xLjUgMS4yLTMuOCAxLjQtNS42LjEtLjkuNS0yIC45LTIuNy41LS44IDEuNS0uOCAyLjItMS4zLjYtLjUgMS42LTEuMyAxLjUtMi0uMy0uOS0xLjItMS4yLTEuOS0xLjUiLz48cGF0aCBkPSJtMjYuNCAyLjVjLTEzLjIgMC0yNCAxMC44LTI0IDI0IDAgMTMuMiAxMC44IDI0IDI0IDI0IDEzLjIgMCAyNC0xMC44IDI0LTI0IDAtMTMuMy0xMC44LTI0LTI0LTI0bTE0LjIgNDEuOGMwIDAgMCAwIDAgMG0uOS0xLjNjLS43LjMtMS41LjQtMi4yLjEtLjYtLjMtMS0uOC0xLjEtMS41LS4xLTEgLjQtMi4xLjktMi44LjYtMS4xIDIuMS0zIDMuOC00LjIgMi40LTEuOCA0LjEtMi4zIDMuNS0yLjctLjQtLjMtMi43IDEtMy4yIDEuMi0yLjYgMS4zLTYuMSA1LjEtNi41IDgtLjMgMiAxLjggMy41IDMuNSAzLjMtNS42IDQuNi0xMS43IDQuNy0xMy43IDQuOC0yIDAtOC4yLS4yLTEzLjctNC44IDEuNy4yIDMuOC0xLjMgMy41LTMuMy0uNC0yLjgtNC02LjYtNi41LTgtLjUtLjItMi43LTEuNS0zLjItMS4yLS42LjQgMS4xLjkgMy41IDIuNyAxLjcgMS4zIDMuMiAzLjEgMy44IDQuMi41LjggMSAxLjkuOSAyLjgtLjEuNy0uNSAxLjItMS4xIDEuNS0uNy4zLTEuNS4yLTIuMi0uMS0xLjEtLjQtMi4xLTEuMy0yLjktMi40LTEuNS0yLTMtNC40LTMuNy02LjkuNiAxLjQgNC43IDcuNCA2LjUgNy41IDEuOC4xLTEuOC00LjgtNC4zLTYuOS0uNi0uNS0xLjMtMS4xLTEuNC0yLS4xLS43LjItMS4xLjktMS4xIDEgMCAzLjYgMS4zIDMuNiAxLjMtNC41LTguMSAyLjQtMTIuMi0uNS0xNC0xLS42LTMuMSAwLTQuMy4yIDEwLjctNi4zIDEyLjUgMCAxNS44IDIuOS41LjUgMi44IDAgMy4yLS41LjYtLjcgMS43LTMuMi40LTQuOC0xLjgtMi4zLTkuMi05LTE2LjEtMy42IDMuNi01LjIgMTEuMS05IDE3LjktOC44IDYuNy0uMiAxNC4yIDMuNiAxNy44IDguOC02LjktNS40LTE0LjMgMS4zLTE2LjIgMy42LTEuMyAxLjYtLjIgNC4xLjQgNC44LjQuNSAyLjcgMSAzLjIuNSAzLjItMi45IDUuMS05LjIgMTUuOC0yLjktMS4yLS4yLTMuMy0uOC00LjMtLjItMi45IDEuOCA0IDUuOS0uNSAxNCAwIC4xIDIuNi0xLjMgMy43LTEuMy43IDAgMSAuNS45IDEuMS0uMS45LS44IDEuNS0xLjQgMi0yLjUgMi4xLTYuMiA3LTQuMyA2LjkgMS44LS4xIDUuOS02IDYuNS03LjUtLjcgMi41LTIuMiA0LjgtMy43IDYuOS0uOSAxLjEtMS45IDItMyAyLjQiLz48cGF0aCBkPSJtMzQuOCAyNC44Yy0uNS0uMy0xLjEtLjQtMS43LS4yLS45LjItMS4xIDEtMS43IDEuOC0uNS44LTEuMyAxLjMtMiAxLjYtLjQgMSAuMyAzLjMgMSA0LjQuNC44IDIgMi44IDEuNyA1LjcgMS4zLTEuOSAyLjMtMy45IDIuNy01LjEuOC0xLjYgMS4xLTQuMiAxLTUuOSAwLS44LS4yLTEuOC0xLTIuM20tLjUgMy4xYy0uNC4yLTEuMy4xLTEuNi43LS41LjgtLjYuOS0uOC44LS41LTEuOCAxLjYtNC4yIDIuNC0zLjUuNy42LjcgMS41IDAgMiIvPjxwYXRoIGQ9Im0yOS4xIDQwLjNjLS45LjEtMS44LjMtMi42LjMtLjggMC0xLjctLjItMi42LS4zLS4xIDAtLjIuMS0uMi4xLS41IDEuMSAyLjQgMS43IDIuOCAxLjcuNCAwIDMuNC0uNiAyLjgtMS43IDAgMC0uMS0uMS0uMi0uMSIvPjwvZz48L3N2Zz4="
                   width="113" height="45" alt="Colorado State University"/>
            </a>
            <div id="responsiveLogoSubsystem">
              <a href={"https://compsci.colostate.edu/"} id="csHeaderLink" target="_blank">
                <h1 className="larger-CSUtext-upper">
                  Computer Science
                </h1>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /**
   *
   * @returns {XML}
   */
  render() {
    return(
      <div>
        {this.topLevelHeader()}
        <Navigation/>
        <div className="add-title"/> {/* Background box to header */}
      </div>
    );
  }

}

export default Header;