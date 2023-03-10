import styled, { css } from "styled-components";
import { Property } from 'csstype';

export interface IFlexBlockBaseProps {
    inline?: boolean;
    flexDirection?: Property.FlexDirection;
    flexFlow?: Property.FlexFlow;
    flexWrap?: Property.FlexWrap;
    alignContent?: Property.AlignContent;
    alignItems?: Property.AlignItems;
    alignSelf?: Property.AlignSelf;
    justifyContent?: Property.JustifyContent;
    justifyItems?: Property.JustifyItems;
    justifySelf?: Property.JustifySelf;
    maxWidth?: string;
    maxHeight?: string;
    width?: string;
    height?: string;
    gap?: string;
    overflowX?: Property.OverflowX;
    overflowY?: Property.OverflowY;
    margin?: Property.Margin;
    padding?: Property.Padding;
}

export const FlexBox = styled.div<IFlexBlockBaseProps>`
    display: ${({ inline }) => (inline ? 'inline-flex' : 'flex')};
    flex-shrink: 0;
    flex-grow: 0;
    ${({ flexDirection }) => flexDirection && css`flex-direction: ${flexDirection};`}
    ${({ flexFlow }) => flexFlow && css`flex-flow: ${flexFlow};`}
    ${({ flexWrap }) => flexWrap && css`flex-flow: ${flexWrap};`}
    ${({ alignContent }) => alignContent && css`align-content: ${alignContent};`}
    ${({ alignItems }) => alignItems && css`align-items: ${alignItems};`}
    ${({ alignSelf }) => alignSelf && css`align-self: ${alignSelf};`}
    ${({ justifyContent }) => justifyContent && css`justify-content: ${justifyContent};`}
    ${({ justifyItems }) => justifyItems && css`justify-items: ${justifyItems};`}
    ${({ justifySelf }) => justifySelf && css`justify-self: ${justifySelf};`}
    ${({ height }) => height && css`height: ${height};`}
    ${({ width }) => width && css`width: ${width};`}
    ${({ maxHeight }) => maxHeight && css`max-height: ${maxHeight};`}
    ${({ maxWidth }) => maxWidth && css`max-width: ${maxWidth};`}
    ${({ overflowX }) => overflowX && css`overflow-x: ${overflowX};`}
    ${({ overflowY }) => overflowY && css`overflow-y: ${overflowY};`}
    ${({ gap }) => gap && css`gap: ${gap};`}
    ${({ padding }) => padding && css`padding: ${padding};`}
    ${({ margin }) => margin && css`margin: ${margin};`}

`;
